const path = require('path');

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

//=========================================================
//  VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV)
const ENV_DEVELOPMENT = typeof NODE_ENV === 'undefined' || NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';

const HOST = '0.0.0.0';
const PORT = 3000;

//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
  js: {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
  scss: {test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader'}
};

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

config.resolve = {
  extensions: ['.js', '.jsx'],
  modules: [
    path.resolve('.'),
    'node_modules'
  ]
};

config.plugins = [
  new LoaderOptionsPlugin({
    debug: false,
    minimize: true,
    options: {
      postcss: [
        autoprefixer({browsers: ['last 3 versions']})
      ],
      sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false
      }
    }
  }),

];


//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    main: ['./sources/main.jsx']
  };

  config.output = {
    filename: '[name].js',
    path: path.resolve('./target'),
    publicPath: '/'
  };

  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './sources/index.html'
    })
  );
}


//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.entry.main.unshift(
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server'
  );

  config.module = {
    rules: [
      rules.js,
      rules.scss
    ]
  };

  config.plugins.push(
    new HotModuleReplacementPlugin(),
    new ProgressPlugin()
  );

  config.devServer = {
    contentBase: './sources',
    historyApiFallback: true,
    host: HOST,
    hot: true,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}


//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
  config.devtool = 'hidden-source-map';

  config.output.filename = '[name].[chunkhash].js';

  config.module = {
    rules: [
      rules.js,
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader?-autoprefixer-loader!postcss-loader!sass-loader')}
    ]
  };

  config.plugins.push(
    new ExtractTextPlugin('styles.[contenthash].css'),
    new UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      }
    })
  );
}
