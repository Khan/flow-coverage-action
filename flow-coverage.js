// @flow

const fs = require('fs');
const sendReport = require('actions-utils/send-report');
const checkFile = require('./flow-coverage-linter');

async function runFlowCoverage(
    subtitle /*: ?string*/,
    flowBin /*: string*/,
    jsFiles /*: Array<string>*/,
) {
    const allAnnotations = [];
    console.log(`Checking ${jsFiles.length} files`);
    for (const file of jsFiles) {
        try {
            const annotations = await checkFile(flowBin, file);
            allAnnotations.push(...annotations);
            if (annotations.length) {
                console.log(` ${file} : ${annotations.length} violations`);
            } else {
                process.stdout.write('.');
            }
        } catch (err) {
            console.error(`Failed to check ${file}`);
            console.error(err);
            allAnnotations.push({
                message: `Failed to check ${file}. ${err.message}\n${err.stack}`,
                start: {line: 1, column: 1},
                end: {line: 1, column: 1},
                annotationLevel: 'failure',
                path: file,
            });
        }
    }
    await sendReport(`Flow Coverage${subtitle ? ' - ' + subtitle : ''}`, allAnnotations);
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

module.exports = {runFlowCoverage, getFlowBin};
