// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
const packageJsonDeps = require('./package.json')['dependencies']

const PORT = 9000;

const isProduction = process.env.NODE_ENV == 'production';
const ASSET_PATH = process.env.ASSET_PATH || `http://localhost:${PORT}/`;

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const remoteHosts = ["http://localhost:9001"];

const config = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: ASSET_PATH
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: PORT,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'shell',
            library: { type: "var", name: "shell_remote" },
            remotes: {
                'dashboard': "dashboard",
            },
            shared: {
                "react-router-dom": { singleton: true, eager: true, requiredVersion: packageJsonDeps["react-router-dom"] },
                react: { singleton: true, eager: true, requiredVersion: packageJsonDeps.react },
                "react-dom": { singleton: true, eager: true, requiredVersion: packageJsonDeps["react-dom"] }
            },
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: ['ts-loader'],
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

        config.plugins.push(new MiniCssExtractPlugin());


        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

        config['externalsType'] = 'script';
        config.externals['react'] = ['https://unpkg.com/react@17/umd/react.production.min.js', 'React']
        config.externals['react-dom'] = ['https://unpkg.com/react-dom@17/umd/react-dom.production.min.js', 'ReactDOM']
    } else {
        config.mode = 'development';
        // config.plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    return config;
};
