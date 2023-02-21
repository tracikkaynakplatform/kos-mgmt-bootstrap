
const exec = require('child_process').execFile;

const util = require('util');
require('util.promisify').shim();


/* export */ const promiseExecFile = util.promisify(exec);

// import { promiseExecFile } from './promise-exec';
// const promiseExecFile = require('./promise-exec').promiseExecFile;

// var exec = require('child_process').execFile;


const path = 'clusterctl'

const args_json = ['--output', 'json']


var args = ['version'].concat(args_json)

// const { stdout } = await promiseExecFile(path, args);

promiseExecFile(path, args)
  .then((out) => {
    if (out.stderr) {
        console.log('OUT ERROR:', out.stderr);  
    }
    const output = JSON.parse(out.stdout);

    console.log('output:\n', output);
    // console.log(output);
  })
  .catch((err) => {
      console.log('ERROR:', err);
  });

console.log('Endof clusterctl');
