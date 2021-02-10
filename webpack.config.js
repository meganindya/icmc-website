const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const speakers = require('./data/speakers.json');
const committee = require('./data/committee.json');

const _comp = require('./data/_comp.json');
const comp = _comp.sort((a, b) => a.name.localeCompare(b.name));

const _math = require('./data/_math.json');
const math = _math.sort((a, b) => a.name.localeCompare(b.name));

const accepted = require('./data/_accepted.json');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: [
                    'html-loader',
                    {
                        loader: 'ejs-html-loader',
                        options: {
                            context: { speakers, committee, comp, math, accepted }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(pdf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'res/'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: (url) => url.slice(url.indexOf('img\\') + 4).replace(/\\/g, '/'),
                            outputPath: (url) => `img/${url}`,
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/views/index.ejs',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new RemovePlugin({
            before: {
                test: [
                    {
                        folder: './dist',
                        method: () => true
                    }
                ],
                exclude: ['./dist/.git']
            }
        })
    ],
    devServer: {
        watchContentBase: true
    }
};
