const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const metadata = require('./data/metadata.json');
const speakers = require('./data/speakers.json');
const committee = require('./data/committee.json');
const comp = require('./data/comm_comp.json');
const math = require('./data/comm_math.json');
const accepted = require('./data/accepted.json');

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
                            context: {
                                metadata,
                                speakers,
                                committee: { ...committee, comp, math },
                                accepted
                            }
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
