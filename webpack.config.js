const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
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
        filename: 'static/js/bundle.js'
    },
    // extension sequence used to resolve modules
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.css$/,
            include: PATHS.app,
            loaders: ['style', 'css']
        }, {
            // supports both .js and .jsx files
            test: /\.jsx?$/,
            include: PATHS.app,
            loader: 'babel',
            query: {
                // need this two parameters for babel to handle es6 and react related features
                presets: ['es2015', 'react'],
                cacheDirectory: TARGET === 'start' // use cache only when running dev-server
            }
        }]
    }
};

module.exports = common;

if (TARGET === 'start') {
    module.exports = merge(module.exports, {
        devtool: 'source-map',
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
            // read the template html file, inject bundles from entries
            // and write the injected html file into output directory
            new HtmlWebpackPlugin({
                template: PATHS.public + '/index.html'
            })
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(module.exports, {
        output: {
            path: PATHS.build,
            filename: 'static/js/[name].[chunkhash:8].js'
        },
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
