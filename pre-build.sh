#!/bin/bash
set -e # fail bash script on any error below

yarn install --non-interactive
yarn run build

UPLOADER="https://github.com/bufferapp/buffer-static-upload/releases/download/0.1.0/buffer-static-upload-`uname -s`"
curl -L $UPLOADER > ./buffer-static-upload
chmod +x ./buffer-static-upload

FILES="vendor.js,bundle.js,bundle.css"
./buffer-static-upload -files "$FILES" -dir publish
