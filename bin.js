#!/usr/bin/env node
// @flow

const {runFlowCoverage, getFlowBin} = require('./flow-coverage');

const [_, __, ...inputFiles] = process.argv;

if (!inputFiles.length) {
    console.log(`No files provided. Exiting.`);
    process.exit(1);
} else {
    runFlowCoverage(null, getFlowBin(), inputFiles);
}
