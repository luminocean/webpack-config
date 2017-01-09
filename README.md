Here's a template for the webpack configuration file. You can use this to setup a web project based on webpack quickly.

This project also comes with a dummy little project shows how everything works.

# what's in the webpack config file

- compiles things in `app` dir and output result bundle files into `build` dir using command `npm run build`
- starts up a dev server with hot module replacement using command `npm start`
- supports conversion from ES6 code and JSX into ES5 version
- support import css files (the actual css content will be inject into html page by js code in output js bundles) and images (in the final form of url link or base64 encoding) into js code
- automatically add hash to resources (js, css, etc) in production build 

# how to use this project

```
# create your project dir and clone this repo into it
mkdir your_project
cd your_project
git clone https://github.com/luminocean/webpack-config

# copy the webpack config file into your project and init all essential stuff
./webpack-config/scripts/init_webpack.sh .

# all done, clean
rm -r webpack-config
```

# install dependencies manually

If you don't want to use the automatic script, you copy the webpack config and modify it whatever you like.
Besides, you have to run the following commands to get it really works:

`npm install webpack webpack-dev-server webpack-merge npm-install-webpack-plugin style-loader css-loader file-loader url-loader eslint eslint-loader html-webpack-plugin babel-loader babel-core babel-preset-es2015 --save-dev`

If you are developing React, also run:
- `npm install react react-dom --save`
- `npm install babel-preset-react --save-dev`