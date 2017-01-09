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
        // this will automatically form a nested folder structure
        filename: `static/js/[name]${TARGET === 'build'?'.[hash:8]':''}.js`,
        // this will be the prefix of the file name above
        // default is ''
        publicPath: '/'
    },
    // extension sequence used to resolve modules
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            exclude: [
                /\.html$/,
                /\.(js|jsx)$/,
                /\.css$/,
                /\.json$/,
                /\.svg$/
            ],
            loader: 'url',
            query: {
                limit: 10000,
                name: `static/media/[name]${TARGET === 'build'?'.[hash:8]':''}.[ext]`
            }
        },{
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
                // enables cache for faster recompilation
                cacheDirectory: TARGET === 'start'
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
