const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const envSettings = require('./envSettings.json');

const common = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /build/],
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s(a|c)ss$/i,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            // {
            //     test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|ico)(\?\S*)?$/,
            //     exclude: /node_modules/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]',
            //         outputPath: '/images/',
            //         publicPath: '/src/assets/'
            //     }
            // },
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'url-loader?limit=100000'
            },           
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            }
        ]
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
            favicon: path.resolve('./public/favicon.ico')
        }),
        new webpack.optimize.OccurrenceOrderPlugin()    
    ]
};

const productionConfig = {
    mode: 'production',
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {               
                compress: {},
                mangle: true                
            },
          }),
        ],
    }
};

const developmentConfig = {
    mode: 'development',
    devServer: {
        stats: 'errors-warnings',
        overlay: {
            errors: true,
            warnings: true
        },
        port: envSettings.port,
        historyApiFallback: true,
        contentBase: './src',
    }
};

module.exports = function () {
    if (process.env.NODE_ENV === 'production') {
        return merge([
            common,
            productionConfig
        ]);
    }
    if (process.env.NODE_ENV === 'development') {
        return merge([
            common,
            developmentConfig
        ]);
    }
};