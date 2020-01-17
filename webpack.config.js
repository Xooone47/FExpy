const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const getConfigs = (env, argv) => {
    const mode = argv.mode === 'development' ? 'DEV' : 'PROD';

    return {
        entry: './src/index.js',
        output: {
            filename: 'index.[hash].js',
            path: path.resolve(__dirname, 'dist', 'assets'),
            publicPath: '/assets/'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            modules: ['node_modules'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
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
                    test: /(\.jsx|\.js|\.ts|\.tsx)$/,
                    use: [
                        'babel-loader',
                        {
                            loader: 'eslint-loader',
                            options: {
                                // cache: true,
                                configFile: path.join(__dirname, 'configs/.eslintrc.js')
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
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ['file-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'FExpy',
                template: './src/index.html',
                filename: mode === 'DEV' ? 'index.html' : '../index.html'
            }),
            new ExtractTextPlugin('styles.[hash].css'),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new WebpackBuildNotifierPlugin({ // 构建完弹窗通知
                title: "Project Build",
                suppressSuccess: false
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
                generateStatsFile: false, // 是否生成stats.json文件
            })
        ]
    };
};

module.exports = getConfigs;

// 这个东西暂时有bug
// 构建时展示打包过程各部件的耗时
// const smp = new SpeedMeasurePlugin({
//     disable: process.env.ANALYZE // 进行analyze时不运行，避免污染stat.json的输出
// });

// module.exports = smp.wrap(getConfigs);
