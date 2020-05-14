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
require('@babel/register');

const checkFile = require('./flow-coverage-linter');

const sendReport = require('./send-report');
// const getBaseRef = require('./get-base-ref');
// const gitChangedFiles = require('./git-changed-files');

async function run(flowBin, filesList) {
    const jsFiles = filesList.filter((file) => file.endsWith('.js'));
    if (!jsFiles.length) {
        console.log('No files given');
        return;
    }
    const allAnnotations = [];
    for (const file of jsFiles) {
        const annotations = await checkFile(flowBin, file);
        allAnnotations.push(...annotations);
    }
    await sendReport('Flow-coverage', allAnnotations);
}

const [_, __, flowBin, ...argvFiles] = process.argv;

if (flowBin) {
    run(flowBin, argvFiles).catch((err) => {
        console.error(err);
        process.exit(1);
    });
} else {
    const flowBin = process.env['INPUT_FLOW-BIN'];
    const filesRaw = process.env['INPUT_FILES'];
    if (!flowBin) {
        console.log('Must supply flow-bin argument');
        process.exit(1);
    } else if (!filesRaw) {
        console.log('Must supply "files" argument');
        process.exit(1);
    } else {
        run(flowBin, filesRaw.split(':::')).catch((err) => {
            console.error(err); // flow-uncovered-line
            process.exit(1);
        });
    }
}
