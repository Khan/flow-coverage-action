// @flow

/**
 * This action runs `flow` and lints against uncovered expressions.
 *
 * It uses `send-report.js` to support both running locally (reporting to
 * stdout) and under Github Actions (adding annotations to files in the GitHub
 * UI).
 */

import checkFile from './flow-coverage-linter';
import sendReport from 'actions-utils/send-report';
import fs from 'fs';

async function run(flowBin: string, filesList: Array<string>) {
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
    let flowBin = process.env['INPUT_FLOW-BIN'];
    let filesRaw = process.env['INPUT_FILES'];
    if (!flowBin && fs.existsSync('node_modules/.bin/flow')) {
        flowBin = 'node_modules/.bin/flow';
    }
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
