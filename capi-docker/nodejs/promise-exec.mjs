
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const exec = require('child_process').execFile;

const util = require('util');
require('util.promisify').shim();


const promiseExecFile = util.promisify(exec);

export default promiseExecFile
