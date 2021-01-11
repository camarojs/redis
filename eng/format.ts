import { execSync } from 'child_process';

// 获取全部暂存区的文件，并对暂存区文件进行lint验证
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM').toString().split('\n');
let pass = true;
const result = [];
for (let i = 0; i < stagedFiles.length; i++) {
    const file = stagedFiles[i];
    if (file && file.match(/.ts$/)) {
        try {
            const res = execSync(`eslint --fix ${file}`);
            execSync(`git add ${file}`);
            if (res.length > 0) {
                throw Error();
            } else {
                console.log(`Fix ${file} success.`);
            }
        } catch (e) {
            pass = false;
            result.push(`Eslint fix '${file}' failed!\n`);
            result.push(`Use eslint --fix '${file}' to show detail.\n`);
        }
    }
}

console.log('\n\x1B[31m%s\x1B[0m', result.join(''));

if (!pass) {
    process.exit(1);
}
process.exit(0);
