#!/usr/bin/env node
// @flow

/**
 * This action runs `flow` and lints against uncovered expressions.
 *
 * It uses `send-report.js` to support both running locally (reporting to
 * stdout) and under Github Actions (adding annotations to files in the GitHub
 * UI).
 */

// $FlowFixMe: shhhhh
require('@babel/register'); // flow-uncovered-line

const sendReport = require('actions-utils/send-report');
const getBaseRef = require('actions-utils/get-base-ref');
const gitChangedFiles = require('actions-utils/git-changed-files');
const fs = require('fs');
const path = require('path');

const checkFile = require('./flow-coverage-linter');

async function run(flowBin) {
    const baseRef = await getBaseRef();
    if (!baseRef) {
        console.log('Unable to determine base ref');
        return;
    }
    const files = await gitChangedFiles(baseRef, '.');
    const jsFiles = files.filter((file) => file.endsWith('.js'));
    if (!jsFiles.length) {
        console.log('No changed files');
        return;
    }
    const allAnnotations = [];
    for (const file of jsFiles) {
        const annotations = await checkFile(flowBin, file);
        allAnnotations.push(...annotations);
    }
    await sendReport('Flow Coverage', allAnnotations);
}

const getFlowBin = () /*:string*/ => {
    if (process.env['INPUT_FLOW-BIN']) {
        return process.env['INPUT_FLOW-BIN'];
    }
    const guess = 'node_modules/.bin/flow';
    if (fs.existsSync(guess)) {
        return guess;
    }
    console.error('No flow-bin found (pass in as an input)');
    process.exit(1);
    throw new Error();
};

// flow-next-uncovered-line
run(getFlowBin()).catch((err) => {
    console.error(err); // flow-uncovered-line
    process.exit(1);
});
