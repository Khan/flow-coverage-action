#!/usr/bin/env node
// @flow

/**
 * This action runs `flow` and lints against uncovered expressions.
 *
 * It uses `send-report.js` to support both running locally (reporting to
 * stdout) and under Github Actions (adding annotations to files in the GitHub
 * UI).
 */

require('@babel/register');

const getBaseRef = require('actions-utils/get-base-ref');
const {cannedGithubErrorMessage} = require('actions-utils/get-base-ref');
const gitChangedFiles = require('actions-utils/git-changed-files');
const {runFlowCoverage, getFlowBin} = require('./flow-coverage');

function run(flowBin) {
    const subtitle = process.env['INPUT_CHECK-RUN-SUBTITLE'];
    const workingDirectory = process.env['INPUT_CUSTOM-WORKING-DIRECTORY'];

    const baseRef = getBaseRef();
    if (!baseRef) {
        console.log('Unable to determine base ref');
        console.error(cannedGithubErrorMessage());
        return Promise.resolve();
    }
    return gitChangedFiles(baseRef, workingDirectory || '.').then(files => {
        const jsFiles = files.filter(file => file.endsWith('.js'));
        if (!jsFiles.length) {
            console.log('No changed files');
            return;
        }
        runFlowCoverage(subtitle, flowBin, jsFiles);
    });
}

// flow-next-uncovered-line
run(getFlowBin()).catch(err => {
    console.error(err); // flow-uncovered-line
    process.exit(1);
});
