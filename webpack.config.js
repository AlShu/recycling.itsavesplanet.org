const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
//const normalize = require('postcss-normalize')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  HashedModuleIdsPlugin,
  optimize: {
    AggressiveMergingPlugin,
    ModuleConcatenationPlugin
    },
  } = require('webpack')

const browsersList = ['> 1%']

const cssLoader = [
  MiniCssExtractPlugin.loader, ['css-loader', 'sass-loader']
];


const babelLoader = {
  loader: 'babel-loader',
//  options: {
//    presets: [
//      ['@babel/env', {
//        loose: true,
//        useBuiltIns: 'entry',
//        shippedProposals: true,
//        targets: {
//          browsers: browsersList,
//        },
//      }],
//    ],
//    //plugins: [
//    //  '@babel/transform-runtime',
//    //],
//    env: {
//      production: {
//        presets: [
//          ['minify', {
//            evaluate: false,
//            mangle: false,
//          }],
//        ],
//      },
//    },
//  },
}

module.exports = {
  entry: {
    app: [
      resolve(__dirname, 'assets/js/app.js')
    ],
    //css: [
    //  resolve(__dirname, 'assets/css/app.sass')
    //]
  },
  output: {
    path: resolve(__dirname, 'priv/static'),
    filename: 'js/[name].js',
    publicPath: '/',
    //hotUpdateChunkFilename: 'hot/hot-update.js',
    //hotUpdateMainFilename: 'hot/hot-update.json',
  },

  context: resolve(__dirname, 'assets'),

  module: {
    rules: [
      {
        test: /\.js?x$/,
        exclude: /node_modules/,
        use: babelLoader,
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              plugins: () => [autoprefixer]
            },
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    //new HtmlWebPackPlugin({
    //  template: "./src/index.html",
    //  filename: "./index.html"
    //}),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name]-[id].css"
    })
  ]
  //optimization: {
  //  splitChunks: {
  //    chunks: "all"
  //  }
  //}
}

