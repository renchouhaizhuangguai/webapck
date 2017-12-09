const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成html
const ExtractTextWebpack = require('extract-text-webpack-plugin');//分离js和css
const ClranWebpackPlugin=require('clean-webpack-plugin');//打包的时候清空原文件
const WebpackChunkHash=require('webpack-chunk-hash');//只有内容改变hash才有变化而不是一打包就会改变
module.exports = {
    entry: './public/main.js',
    //入口文件
    output: {
        path: __dirname + '/build',
        filename: '[name]_[hash:3].js',
        chunkFilename:'[name]_[hash:3].js'
    },
    //出口文件
    module: {
        rules: [{
            test: /\.css$/,
            use:ExtractTextWebpack.extract({
                use: "css-loader"
            })
            //分离cssloader
        },{
            test: /\.scss$/,
            loader:'style-loader!css-loader!sass-loader',
            //配置sassloader
        },{
            test:/\.(jpg|png|gif|jpeg)$/,
            loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]'
            //配置图片，打包后会使小的图片装换为base64编码
        },{
            test:/(\.jsx|\.js)$/,
            use:{
                loader:'babel-loader',
                options:{
                    presets:[
                        "env","react"
                    ]
                }
            },
            exclude:/node-modules/
            //配置es6 和 jax 语法
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html'
        }),
        //自动生成html文件 template 配置index 的一些值
        new ExtractTextWebpack('./css/styles.css'),
        //分离后的css 的名字以及路径
        new ClranWebpackPlugin('build',{
            root:__dirname,
            verbose:true,
            dry:false
        }),
        //打包删除原文件
        new webpack.optimize.OccurrenceOrderPlugin(),
        //模块ID
        new webpack.optimize.UglifyJsPlugin(),
        //压缩js代码
        new WebpackChunkHash()
        //hash值
    ],
    devServer:{
        contentBase:'./public',
        inline:true,
        historyApiFallback:true
    }
};