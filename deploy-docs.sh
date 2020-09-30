#! /bin/bash

if ! command -v "node" > /dev/null
then 
     echo "Node not installed. please install Node for this machine/user."
     exit
fi

if ! command -v "mkdocs" > /dev/null
then 
     echo "mkdocs not installed."
     exit
fi

cwd=$(pwd)
cd "./tools/html-formatter-generator"
npm install
yarn build
cd $cwd
mkdocs gh-deploy
