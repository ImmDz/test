const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        mode: 'development',
        entry: "./src/index.tsx",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.css?$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                src: path.resolve(__dirname, 'src')
            }
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            publicPath: "/",
            filename: "react.js",
            clean: true,
        },
        devServer: {
            port: 3000,
            historyApiFallback: true,
        },
    }
}