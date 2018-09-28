const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => {
    const mode = argv.mode === 'development' ? 'DEV' : 'PROD';

    return {
        entry: './src/index.js',
        output: {
            filename: 'index.[hash].js',
            path: path.resolve(__dirname, 'dist', 'assets'),
            publicPath: '/assets/'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
            modules: ['node_modules']
        },
        devtool: 'inline-source-map',
        devServer: {
            publicPath: '/assets/',
            port: 4747,
            inline: true,
            historyApiFallback: {
                index: '/assets/',
                rewrites: [
                    {
                        from: /^[^/rest/v1].*$/,
                        to: 'index.html'
                    }
                ]
            },
            // proxy: {
            //     '/rest': {
            //         target: 'http://',
            //         secure: false
            //     }
            // },
            hot: true
        },
        module: {
            rules: [
                {
                    test: /(\.jsx|\.js)$/,
                    use: [
                        "babel-loader",
                        {
                            loader: 'eslint-loader',
                            options: {
                                // cache: true,
                                configFile: path.join(__dirname, '.eslintrc.json')
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                    modules: true,
                                    camelCase: 'dashes',
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                }
                            },
                            'less-loader', 'postcss-loader']
                    })
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                      'file-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'FExpy',
                template: "./src/index.html",
                filename: mode === 'DEV' ? 'index.html' : '../index.html'
            }),
            new ExtractTextPlugin('styles.[hash].css'),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ]
    };
};
