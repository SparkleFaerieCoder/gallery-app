/**
 * release prep command.
 * used in scripts/release
 */
const path = require('path');
const fs = require('fs');

const git = require('isomorphic-git');

const DEFAULT_GIT_CONFIG = {
  fs,
  dir: path.join(__dirname, '..'),
};

/**
 * Check that repo is unmodified
 * see: https://isomorphic-git.org/docs/en/statusMatrix
 */
async function checkRepoStatus() {
  const WORKDIR = 2;
  const STAGE = 3;

  console.log('checking that working tree is clean');

  const status = await git.statusMatrix({ ...DEFAULT_GIT_CONFIG });
  const hasChanges = status.filter((row) => row[WORKDIR] !== row[STAGE]).length > 0;

  if (hasChanges) {
    throw new Error('Respository is dirty');
  }
}

/**
 * Checkout a branch from git.
 */
// async function checkoutRef(ref, options = { force: true }) {
//   return git.checkout({
//     ...DEFAULT_GIT_CONFIG,
//     ...options,
//     ref,
//   });
// }

/**
 * Pull latest changes from git
 */
async function pullChangesFromRef(ref) {
  return git.pull({
    ...DEFAULT_GIT_CONFIG,
    fastForwardOnly: true,
    ref,
  });
}

/**
 * Create a release branch from a version number
 */
async function createReleaseBranch({ versionNumber, branchPrefix }) {
  const branchName = `${branchPrefix}${versionNumber}`;
  console.log('creating branch: ', branchName);
  // await checkoutRef(branchName)
  await git.branch({ ...DEFAULT_GIT_CONFIG, ref: branchName, checkout: true });
}

async function confirmBranch(branch) {
  console.log('confirming current branch is: ', branch);
  const currentBranch = await git.currentBranch({ ...DEFAULT_GIT_CONFIG });
  const onCorrectBranch = currentBranch === branch;

  if (!onCorrectBranch) {
    throw new Error(`Wrong branch. Current: ${currentBranch}, required: ${branch}`);
  }
}

async function pushChangesToOrigin() {
  const currentBranch = await git.currentBranch({ ...DEFAULT_GIT_CONFIG });
  console.log('pushing to ', `origin/${currentBranch}`);

  return git.push({
    ...DEFAULT_GIT_CONFIG,
    remoteRef: `origin/${currentBranch}`,
  });
}

/**
 * Prep a release. This is meant to be used on CI but can also be ran locally if necessary
 * 1. Makes sure working tree is clean
 * 2. Makes sure develop is up-to-date
 * 3. Cuts a release branch from develop -> release-XXX
 * 4. Pushes the branch to the remote
 */
async function handler({
  versionNumber,
  mainBranch,
  productionBranch,
  releaseBranchPrefix,
  hotfix,
  hotfixBranchPrefix,
}) {
  const baseBranch = hotfix ? productionBranch : mainBranch;

  try {
    await checkRepoStatus();
    await confirmBranch(baseBranch);
    await pullChangesFromRef(baseBranch);
    await (hotfix
      ? createReleaseBranch({ versionNumber, branchPrefix: hotfixBranchPrefix })
      : createReleaseBranch({
          versionNumber,
          branchPrefix: releaseBranchPrefix,
        }));
    await pushChangesToOrigin();
  } catch (e) {
    console.error(e);
  }
}

function builder(yargs) {
  return yargs
    .option('main-branch', {
      type: 'string',
      alias: 'main',
      default: 'development',
    })
    .option('production-branch', {
      type: 'string',
      alias: 'prod',
      default: 'main',
    })
    .option('release-branch-prefix', {
      alias: 'pre',
      type: 'string',
      default: 'release-',
    })
    .option('hotfix-branch-prefix', {
      alias: 'hpre',
      type: 'string',
      default: 'hotfix-',
    })
    .option('hotfix', { type: 'string', default: false });
}

exports.command = ['prep <versionNumber>'];
exports.desc = 'Prep a release';
exports.builder = builder;
exports.handler = handler;
