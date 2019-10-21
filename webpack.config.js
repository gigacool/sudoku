const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {



    return {

        entry: ['./sources/main.jsx'],

        output: {
            filename:'[name].js',
            path: path.resolve(__dirname, './doc'),
            // publicPath: '/' // doing wrong with dev-server TODO check on prod
        },

        resolve: {
            extensions: ['.js', '.jsx']
        },

        module: {
            rules: [
                { // js & jsx
                    test: /\.jsx?$/, 
                    exclude: /node_modules/, 
                    loader: 'babel-loader'
                },
                { // css & scss
                    test: /\.s?css$/, 
                    loader: 'style-loader!css-loader!sass-loader'
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template:'./sources/index.html',
                filename:'./index.html'
            })
        ]

    }
}