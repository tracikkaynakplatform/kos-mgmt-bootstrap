#!/usr/bin/env bash

ENDPOINT="$1"

## cacert is defined as --client-ca-file=/etc/kubernetes/ssl/ca.crt in apiserver yaml.
curl "$ENDPOINT" \
  --cacert <(kubectl config view --minify --raw --output 'jsonpath={..cluster.certificate-authority-data}' | base64 -d) \
  --cert <(kubectl config view --minify --raw --output 'jsonpath={..user.client-certificate-data}' | base64 -d) \
  --key <(kubectl config view --minify --raw --output 'jsonpath={..user.client-key-data}' | base64 -d)
