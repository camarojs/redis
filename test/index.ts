import { spawn } from 'child_process';

const MOCHA_PATH = require.resolve('mocha/bin/mocha');
const TS_NODE_PATH = require.resolve('ts-node/register');

const mocha = spawn(process.execPath, [
    MOCHA_PATH,
    '-r',
    TS_NODE_PATH,
    './**/*.test.ts'
], {
    stdio: 'inherit',
});

mocha.on('exit', (code, signal) => {
    process.on('exit', () => {
        if (signal) {
            process.kill(process.pid, signal);
        } else {
            process.exit(code as number);
        }
    });
});

process.on('SIGINT', function () {
    mocha.kill('SIGINT');
    mocha.kill('SIGTERM');
});