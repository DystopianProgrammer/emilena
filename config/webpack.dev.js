var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',

        proxy: {
            '/staff/add': 'http://localhost:9090',
            '/staff/all': 'http://localhost:9090',
            '/staff/delete*': 'http://localhost:9090',
            '/client/add': 'http://localhost:9090',
            '/client/all': 'http://localhost:9090',
            '/client/delete*': 'http://localhost:9090'
        }
    }
});
