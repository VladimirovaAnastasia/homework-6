import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

import ModuleLogger from './plugins/moduleLogger';

const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        root: {
            import: './src/pages/root.tsx',
            dependOn: 'shared'
        },
        root2: {
            import: './src/pages/root2.tsx',
            dependOn: 'shared'
        },
        shared: ['react']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(),
        new ModuleLogger(),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
        // new BundleAnalyzerPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /crypto-browserify/,
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        fallback: {
            "buffer": require.resolve("buffer"),
            "stream": false,
        },
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            }
        ]
    },
};

export default config;
