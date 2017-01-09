const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    public: path.join(__dirname, 'public')
};

const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    // extension sequence used to resolve modules
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: PATHS.app
        }, {
            // supports both .js and .jsx files
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                // need this two parameters for babel to handle es6 and react related features
                presets: ['es2015', 'react'],
                cacheDirectory: true
            },
            include: PATHS.app
        }]
    }
};

module.exports = common;

// additional npm start specific config
if(TARGET === 'start'){
    module.exports = merge(module.exports, {
        devtool: 'eval-source-map',
        // configs for webpack-dev-server
        devServer: {
            contentBase: PATHS.build,
            hot: true,
            inline: true,
            // stats: 'errors-only'
            // progress: true,
            // historyApiFallback: true
        },
        plugins: [
            // support hot module replacement during development
            new webpack.HotModuleReplacementPlugin(),
            // automatically install missing npm packages during webpack compilation
            new NpmInstallPlugin({save: true}),
            // read the template html file, inject bundles from entries
            // and write the injected html file into output directory
            new HtmlWebpackPlugin({
                template: PATHS.public + '/index.html'
            })
        ]
    });
}

if(TARGET === 'build'){
    module.exports = merge(module.exports, {
        plugins: [
            new HtmlWebpackPlugin({
                template: PATHS.public + '/index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                }
            })
        ]
    });
}
