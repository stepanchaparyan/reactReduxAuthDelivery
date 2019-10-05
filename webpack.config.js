const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

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
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: '/src/assets/'
                }
            },
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.gif', '.png']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
            favicon: path.resolve('./public/favicon.ico')
        })
    ],
    performance: {
        // hints: 'warning', // false, 'error'
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};

const developmentConfig = {
    devServer: {
        stats: 'errors-only',
        overlay: {
            errors: true,
            warnings: true
        },
        port: 3003,
        historyApiFallback: true,
        contentBase: './',
        hot: true
    }
    // watch: true
    // devtool: 'source-map',
    // devtool: 'inline-source-map'
};

module.exports = function (env) {
    if (env === 'production') {
        return common;
    }
    if (env === 'development') {
        return merge([
            common,
            developmentConfig
        ]);
    }
};
