#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const Xcode = require('pbxproj-dom/xcode').Xcode;
const plist = require('plist');
const unique = require('lodash').uniq;
const flattenDeep = require('lodash').flattenDeep;

const IOS_DIR = path.join(__dirname, '..', '..', 'ios');
const BUILD_GRADLE_PATH = path.join(__dirname, '..', '..', 'android/app/build.gradle');
// minimum build number that has been release on the Play Store. This must always increment.
const MIN_BUILD_VERSION = 401000010; //This is the production version 4.1.0 on google play as of 1/10/2022

/**
 * Write iOS and Android Build/App versions
 */
async function writeBuildAndAppVersions() {
  // Version submitted by user in GitHub Actiobn run
  const appVersion = process.env.APP_VERSION || '2.2.2';

  // GitHub Action run number
  const parsedBuildVersion = Number(process.env.BUILD_VERSION) || 1;

  // Note the Number() conversion above. versionCode in build.gradle MUST be an integer.
  const buildVersion = parsedBuildVersion + MIN_BUILD_VERSION;

  await updateIOSVersions({ appVersion, buildVersion });
  await updateAndroidVersions({ appVersion, buildVersion });
}

/**
 * Updates ios projects/plists with new app versions
 */
async function updateIOSVersions({ appVersion, buildVersion }) {
  console.log(`-- Updating iOS App version to ${appVersion} --`);
  console.log(`-- Updating iOS build version to ${buildVersion} --`);

  const xcodeProjects = fs.readdirSync(IOS_DIR).filter((file) => /\.xcodeproj$/i.test(file));

  const projectFolder = path.join(IOS_DIR, xcodeProjects[0]);
  const xcode = Xcode.open(path.join(projectFolder, 'project.pbxproj'));

  await updateXcodeProjects({ xcode, buildVersion, appVersion });
  await updatePlists({ xcode, buildVersion, appVersion });
}

/**
 * Updates the CURRENT_PROJECT_VERSION within an xcode project
 */
async function updateXcodeProjects({ xcode, buildVersion }) {
  xcode.document.projects.forEach((project) => {
    project.targets.filter(Boolean).forEach((target) => {
      target.buildConfigurationsList.buildConfigurations.forEach((config) => {
        config.patch({
          buildSettings: {
            CURRENT_PROJECT_VERSION: buildVersion,
          },
        });
      });
    });
  });

  return xcode.save();
}

/**
 * Updates plists with a new app/build version
 */
async function updatePlists({ xcode, appVersion, buildVersion }) {
  const plistFileNames = getPlistFilenames(xcode);

  const plistsToSave = plistFileNames.map((filename) => {
    const plistPath = path.join(IOS_DIR, filename);
    const plistObject = plist.parse(fs.readFileSync(plistPath, 'utf8'));

    plistObject.CFBundleShortVersionString = appVersion;
    plistObject.CFBundleVersion = `${buildVersion}`;

    const file = plist.build(plistObject);
    return fs.promises.writeFile(plistPath, file);
  });

  await Promise.all(plistsToSave);
}

/**
 * Gets plists used in a given project
 */
function getPlistFilenames(xcode) {
  return unique(
    flattenDeep(
      xcode.document.projects.map((project) => {
        return project.targets.filter(Boolean).map((target) => {
          return target.buildConfigurationsList.buildConfigurations.map((config) => {
            return config.ast.value.get('buildSettings').get('INFOPLIST_FILE').text;
          });
        });
      })
    )
  );
}

/**
 * Updates plists with a new app/build version
 */
async function updateAndroidVersions({ appVersion, buildVersion }) {
  console.log(`-- Updating Android App version to ${appVersion} --`);
  console.log(`-- Updating Android build version to ${buildVersion} --`);
  let gradleFile = await fs.promises.readFile(BUILD_GRADLE_PATH);

  // Note that buildVersion MUST be an integer, or Android builds will fail. See:
  //  https://stackoverflow.com/a/64708656/344391
  gradleFile = gradleFile.toString().replace(/versionCode (\d+)/, `versionCode ${buildVersion}`);

  gradleFile = gradleFile
    .toString()
    .replace(/versionName (["'])(.*)["']/, `versionName $1${appVersion}$1`);

  return fs.promises.writeFile(BUILD_GRADLE_PATH, gradleFile);
}

if (require.main === module) {
  writeBuildAndAppVersions();
}
