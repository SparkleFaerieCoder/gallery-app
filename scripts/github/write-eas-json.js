#!/usr/bin/env node
const fs = require('fs').promises;

const easJson = require('../../eas.json');

// const PLATFORMS = ['ios', 'android'];
const LANES = ['alpha', 'beta', 'production'];

async function writeJson() {
  console.log(`---------------- original eas.json: `, easJson);
  const json = {
    ...easJson,
  };

  const [majorVersion, minorVersion] = (process.env.APP_VERSION || '1').split('.');

  json.build.base.env = {
    ...(json.build.base.env || {}),
    APP_VERSION: process.env.APP_VERSION,
    BUILD_VERSION: process.env.BUILD_VERSION,
  };

  // add lane specific env vars
  LANES.forEach((lane) => {
    // when active, OTA updates will only be used for patch releases
    const releaseChannel = `${lane}-${majorVersion}-${minorVersion}`;
    json.build[lane].releaseChannel = releaseChannel;
  });

  json.submit = {
    beta: {
      ios: {
        appleId: process.env.APPLE_ID,
        ascAppId: process.env.APPLE_ASC_APP_ID,
      },
      android: {
        serviceAccountKeyPath: process.env.ANDROID_EXPO_DEPLOY_KEY_PATH,
        track: process.env.ANDROID_SUBMIT_TRACK,
      },
    },
    production: {
      ios: {
        appleId: process.env.APPLE_ID,
        ascAppId: process.env.APPLE_ASC_APP_ID,
      },
      android: {
        serviceAccountKeyPath: process.env.ANDROID_EXPO_DEPLOY_KEY_PATH,
        track: process.env.ANDROID_SUBMIT_TRACK,
      },
    },
  };

  await fs.writeFile('eas.json', JSON.stringify(json));
}

/**
 * Writes information to EAS.json (build number, app version, release channel)
 */
async function run() {
  await writeJson();
}

if (require.main === module) {
  run();
}
