#! /usr/bin/env bash

# This script is used to init the basic environment bases on webpack including:
# - init the package.json file (if none)
# - install all npm dependencies
# - copy the webpack.config.js into current folder
#
# Usage - suppose you clone this project into your project folder
# (say our working directory is /path/to/your/project/ and clone this project into into /path/to/your/project/webpack-config)
# then run:
# ./webpack-config/scripts/init_webpack.sh .
# it will finish all the work. You can then run rm -r ./webpack-config to keep your project clean.

TARGET_PATH=$1

if [ ! -d ${TARGET_PATH} ]; then
    echo "No directory "${TARGET_PATH}" exists"
    exit 1
fi

if [ ! -e "package.json" ]; then
    npm init -y # init npm package
fi

# create a dir called 'app' which should contain all the sources for webpack to compile
mkdir -p ${TARGET_PATH}/app

# copy webpack.config.js file
SCRIPT_PATH=$0
cp `dirname $0`/../webpack.config.js ${TARGET_PATH}

cd ${TARGET_PATH}

# install essential development dependencies
npm install webpack webpack-dev-server webpack-merge npm-install-webpack-plugin style-loader css-loader file-loader url-loader html-webpack-plugin babel-loader babel-core babel-preset-es2015 --save-dev

# react specific dependencies
npm install react react-dom --save
npm install babel-preset-react --save-dev
