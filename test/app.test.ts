import { strictEqual } from 'assert';
import { describe, it } from 'mocha';
import Application from '../src/app';

const app = new Application();

describe('Util.isAsyncFn', () => {
    it('should return 1', () => {
        strictEqual(app.test(), 1);
    });
});
