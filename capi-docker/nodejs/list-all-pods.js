#!/usr/bin/env node

// see: https://github.com/kubernetes-client/javascript/tree/master/examples

const k8s = require('@kubernetes/client-node');

// Use yargs package for real/pro command line processing..
var args = process.argv.slice(2);
kcFile = null;

if (args.length >= 2) {
    kcFile = args[0];
    args = args.slice(1);
}

const kc = new k8s.KubeConfig();
if (kcFile) {
    kc.loadFromFile(kcFile)
} else {
    kc.loadFromDefault();
}
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod(args[0] || 'default').then((res) => {
    console.log(res.body);
});