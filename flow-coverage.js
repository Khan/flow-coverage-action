// @flow

const fs = require('fs');
const sendReport = require('actions-utils/send-report');
const checkFile = require('./flow-coverage-linter');

export async function runFlowCoverage(subtitle: ?string, flowBin: string, jsFiles: Array<string>) {
    const allAnnotations = [];
    for (const file of jsFiles) {
        const annotations = await checkFile(flowBin, file);
        allAnnotations.push(...annotations);
    }
    await sendReport(`Flow Coverage${subtitle ? ' - ' + subtitle : ''}`, allAnnotations);
}

export const getFlowBin = () /*:string*/ => {
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
