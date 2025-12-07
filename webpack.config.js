/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'node',
    entry: {
        extension: './src/extension.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs',
    },
    externals: {
        vscode: 'commonjs vscode', // Ignored because it's provided by the VS Code host environment
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
};
