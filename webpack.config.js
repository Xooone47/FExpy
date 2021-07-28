/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @file webpack settings
 * @author Deland
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const {merge} = require('webpack-merge');

const getIsEnableCssModules = resourcePath => {
    const relativePath = path.relative(__dirname, resourcePath);

    // node_modules和src/styles中的样式文件不开启css modules
    if (relativePath.startsWith('node_modules') || relativePath.startsWith('src/styles')) {
        return false;
    }

    return true;
};

const getPlugins = mode => {
    const commonPlugins = [
        new HtmlWebpackPlugin({
            title: 'FExpy',
            template: './src/index.html',
            filename: mode === 'development' ? 'index.html' : '../index.html',
        }),
        new ExtractTextPlugin({filename: 'styles.[md5:contenthash:hex:8].css'}), // 分离css文件
    ];

    const devPlugins = [
        new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，适用于开发环境
        new webpack.HotModuleReplacementPlugin(),
        new WebpackBuildNotifierPlugin({ // 构建完弹窗通知
            title: 'Project Build',
            suppressSuccess: false,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
            generateStatsFile: false, // 是否生成stats.json文件
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['App is running on: http://localhost:4747'],
                clearConsole: false,
            },
        }),
    ];

    if (mode === 'production') {
        return commonPlugins;
    } else {
        return [
            ...commonPlugins,
            ...devPlugins,
        ];
    }
};

const devConfigs = {
    devtool: 'inline-source-map',
    devServer: {
        publicPath: '/assets/',
        port: 4747,
        inline: true,
        quiet: true, // for friendly-errors-webpack-plugin
        historyApiFallback: {
            index: '/assets/',
            rewrites: [
                {
                    from: /^[^/rest/v1].*$/,
                    to: 'index.html',
                },
            ],
        },
        // proxy: {
        //     '/rest': {
        //         target: 'http://',
        //         secure: false
        //     }
        // },
        hot: true,
    },
};

const getConfigs = (env, argv) => {
    const {mode} = argv;

    const commonConfigs = {
        entry: './src/index.js',
        output: {
            // contenthash不能与HotModuleReplacementPlugin共用
            filename: mode === 'production' ? '[name].[contenthash].js' : '[name].[hash].js',
            path: path.resolve(__dirname, 'dist', 'assets'),
            publicPath: '/assets/',
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            modules: ['node_modules'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /(\.jsx|\.js|\.ts|\.tsx)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                configFile: path.join(__dirname, 'configs/babel.config.js'),
                                cacheDirectory: true,
                            },
                        },
                        {
                            loader: 'eslint-loader',
                            options: {
                                // cache: true,
                                configFile: path.join(__dirname, '.eslintrc.js'),
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(less|css)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                    modules: {
                                        auto: getIsEnableCssModules,
                                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                    },
                                    esModule: false,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        config: path.join(__dirname, 'configs', 'postcss.config.js'),
                                    },
                                },
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    javascriptEnabled: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]',
                    },
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'media/[name].[hash:7].[ext]',
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]',
                    },
                },
            ],
        },
        optimization: {
            namedChunks: true,
            splitChunks: {
                chunks: 'all',
                name: true,
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
        plugins: getPlugins(mode),
    };

    if (mode === 'development') {
        return merge(commonConfigs, devConfigs);
    } else {
        return commonConfigs;
    }
};

module.exports = getConfigs;

// 这个东西暂时有bug
// 构建时展示打包过程各部件的耗时
// const smp = new SpeedMeasurePlugin({
//     disable: process.env.ANALYZE // 进行analyze时不运行，避免污染stat.json的输出
// });

// module.exports = smp.wrap(getConfigs);
