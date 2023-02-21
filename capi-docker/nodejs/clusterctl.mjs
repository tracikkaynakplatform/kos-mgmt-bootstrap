

import promiseExecFile from './promise-exec.mjs';
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
