#!/usr/bin/env node
// @flow
require('@babel/register');

const glob = require('glob');
const {runFlowCoverage, getFlowBin} = require('./flow-coverage');

const [_, __, ...args] = process.argv;

const inputFiles = [];
args.forEach(arg => {
    inputFiles.push(...glob.sync(arg));
});

runFlowCoverage(null, getFlowBin(), inputFiles);
