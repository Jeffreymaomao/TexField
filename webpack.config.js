const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/js/main.js'
    },
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(otf|eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name][ext][query]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext][query]'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/js/katex-0.16.11.min.js', to: 'js/katex-0.16.11.min.js' },
                { from: './src/img/TexField.light.png', to: 'img/TexField.light.png' },
                { from: './src/img/TexField.dark.png', to: 'img/TexField.dark.png' }
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
    },
    performance: {
        hints: false,
    },
    devServer: {
        client: {
            overlay: false,
        },
    },
};