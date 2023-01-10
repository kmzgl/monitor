/*
* webpack 配置
*/
var webpack = require("webpack");
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var fileVersion = new Date().getTime();
module.exports = {
  entry: {
    monitor: ['./src/index.js']
  },

  output: {
    publicPath: "",
    path: path.resolve(__dirname, './dist'), //打包后的文件存放的地方
    filename: '[name].min.js', //打包后输出文件的文件名
    chunkFilename: "[name].min.js",
    library: "monitor",  //类库名称
    libraryTarget: "umd",  //指定输出格式
    umdNamedDefine: true //会对UMD的构建过程中的AMD模块进行命名，否则就使用匿名的define
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-runtime']
          }
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [

    new CleanWebpackPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
      fileVersion: fileVersion //文件版本
    }),

    //压缩配置
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: false
      },
      output: {
        comments: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    }),

    //预览
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: './public/index.html',
      inject: 'body'
    }),
  ],
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
  }
}