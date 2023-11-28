const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:"./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx','.js'],
        alias: {
          '@': path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpg|gif|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
              },
            ],
          },
          {
            test: /\.(js|ts)x?$/,
            loader: require.resolve('babel-loader'),
            exclude: /node_modules/,
            options: { presets: ['@babel/env','@babel/preset-react', "@babel/preset-typescript"] },
          },
        ]},
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};