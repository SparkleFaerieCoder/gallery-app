#!/usr/bin/env node
const execa = require('execa');

/**
 * Run a shell command and pipe output to stdout
 */
function commandWithLog(commandToRun, options = { shell: true }) {
  const command = execa.command(commandToRun, options);
  command.stdout.pipe(process.stdout);
  return command;
}

/**
 * Install Doppler for managing secrets
 */
function installDoppler() {
  console.log('-- Installing Doppler CLI --');

  return commandWithLog(
    '(curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://cli.doppler.com/install.sh || wget -t 3 -qO- https://cli.doppler.com/install.sh) | sh'
  );
}

/**
 * Handles downloading secrets for the current build profile
 * and writes them to an env.
 */
async function fetchDopplerSecretsAndWriteEnv() {
  console.log('-- Fetching Doppler Secrets --');
  const environment = process.env.EAS_BUILD_PROFILE;
  // expects matching doppler token
  const envName = `DOPPLER_TOKEN_${environment.toUpperCase()}`;
  const token = process.env[envName];

  console.log(`-- Setting .env from -- ${envName}, token: ${token}`);

  await commandWithLog(
    `doppler secrets download --no-file --format=env --token=${token} --no-fallback > .env`
  );
}

/**
 * Perform additional actions after EAS has installed dependencies
 */
async function runEasPostInstallHook() {
  try {
    await installDoppler();
    await fetchDopplerSecretsAndWriteEnv();
  } catch (e) {
    console.error(e);
  }
}

if (require.main === module) {
  runEasPostInstallHook();
}
