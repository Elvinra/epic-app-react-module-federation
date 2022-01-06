// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJsonDeps = require('./package.json')['dependencies']

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const PORT = 9001;
const publicPath = `http://localhost:${PORT}/`;


const config = {
    entry: './src/index',
    output: {
        publicPath: publicPath
    },
    devServer: {
        open: false,
        host: 'localhost',
        port: PORT,
    },
    optimization: {
        minimize: isProduction,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            library: { type: "var", name: "dashboard" },
            exposes: {
                './DashboardRoutes': './src/DashboardRoutes',
            },
            shared: {
                ...packageJsonDeps,
                react: { singleton: true, eager: true, requiredVersion: packageJsonDeps.react },
                "react-dom": { singleton: true, eager: true, requiredVersion: packageJsonDeps["react-dom"] }
            },
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new webpack.DefinePlugin({
        })

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
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

        config['externalsType'] = 'script';

        config.externals['react'] = ['https://unpkg.com/react@17/umd/react.production.min.js', 'React']
        config.externals['react-dom'] = ['https://unpkg.com/react-dom@17/umd/react-dom.production.min.js', 'ReactDOM']
    } else {
        config.mode = 'development';
        // config.plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    return config;
};
