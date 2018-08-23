// 清空 build 文件夹下的文件
var buildFolder = 'lib'
var fs = require('fs')
var path = require('path')
var buildPath = './' + buildFolder + '/'
var folder_exists = fs.existsSync(buildPath)

// if (!folder_exists) {
//     fs.mkdirSync(buildFolder)
// }else {
//     var dirList = fs.readdirSync(buildPath)
//     dirList.forEach(function (fileName) {
//         fs.unlinkSync(buildPath + fileName)
//     })
//     console.log("clearing " + buildPath)
// }

// readfile
// 先把index.html里面关于style和js的hash值都删除掉，避免在使用 npm run dev 的时候，路径还是压缩后的路径
// fs.readFile('index.html','utf-8',function (err, data) {
//     if (err) {
//         console.log("clear hash error")
//     } else {
//         var devhtml = data.replace(/((?:href|src)="[^"]+\.)(\w{20}\.)(js|css)/g, '$1$3')
//         fs.writeFileSync('index.html',devhtml)
//     }
// })

var webpack = require('webpack')

/**
 版本控制
 package.json中的
 "html-webpack-plugin": "^1.6.2",
 模块是把生成的带有md5戳的文件，插入到index.html中。
 通过index.tpl模板，生成 index.html
 */
var HtmlWebpackPlugin = require('html-webpack-plugin')


var CleanWebpackPlugin = require('clean-webpack-plugin');

//vue-loader
var VueLoaderPlugin = require('vue-loader/lib/plugin');

//打印的日志
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

//压缩js
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//压缩css
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

//提取CSS到单独文件
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 分离JS文件
var SplitChunksPlugin = webpack.optimize.SplitChunksPlugin

var RuntimeChunkPlugin = webpack.optimize.RuntimeChunkPlugin

//热加载
var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin

//生成稳定的ChunkId
var NamedChunksPlugin = webpack.NamedChunksPlugin

// 在命令行 输入  “PRODUCTION=1 webpack --progress” 就会打包压缩，并且注入md5戳 到 d.html里面
var production = process.env.PRODUCTION


var plugins = []
var entry 
var output


switch(production){
    case '0':
        console.log('开发环境')

        entry = {
            build: './src/app.js'    
        }

        output = {
            path: path.join(__dirname, buildFolder),
            publicPath: '/' + buildFolder + '/',
            filename: '[name].js'
        }

        plugins= [
            new VueLoaderPlugin(),
            new NamedChunksPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new SplitChunksPlugin({
                chunks: 'initial',
                cacheGroups: {
                    vendor: {
                        test: /node_modules\//,
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            }),
            new RuntimeChunkPlugin({
                "name": "manifest"
            }),
            new HtmlWebpackPlugin({
                filename: '../index.html',
                template: 'index.tpl',
                inject: true
            }),
            new CleanWebpackPlugin(
                ['lib/*'],　 //匹配删除的文件
                {
                    root: __dirname,       　　　　　　　　　　//根目录
                    verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                    dry:      false        　　　　　　　　　　//启用删除文件
                }
            )
        ]

        devServer = {}
        devtool = '#eval-source-map'

      break;
    case '1':
        console.log('生产环境')
        entry = {
            build: './src/app.js',
        }

        output = {
            path: path.join(__dirname, buildFolder),
            publicPath: '/' + buildFolder + '/',
            filename: '[name].[chunkhash].js'
        }

        plugins = [
            new VueLoaderPlugin(),
            new NamedChunksPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.[chunkhash].css'
            }),
            new SplitChunksPlugin({
                chunks: 'initial',
                cacheGroups: {
                    vendor: {
                        test: /node_modules\//,
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            }),
            new RuntimeChunkPlugin({
                "name": "manifest"
            }),
            new HtmlWebpackPlugin({
                filename: '../index.html',
                template: 'index.tpl',
                inject: true
            }),
            new CleanWebpackPlugin(
                ['lib/*'],　 //匹配删除的文件
                {
                    root: __dirname,       　　　　　　　　　　//根目录
                    verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                    dry:      false        　　　　　　　　　　//启用删除文件
                }
            )
        ]

        devServer = {}
        devtool = '#source-map'
      break;
    case '2':
        entry = {
            index: './src/static/common.js'
        }

        output = {
            path: path.join(__dirname, buildFolder),
            publicPath: '/' + buildFolder + '/',
            filename: 'index.js',
            chunkFilename: '[name].js',
            libraryTarget: 'commonjs2'
        }

        plugins = [
            new ProgressBarPlugin(),
            new ExtractTextPlugin('style.css'),
            new webpack.LoaderOptionsPlugin({
              minimize: true
            })
          ]

        devServer = {}
        devtool = '#source-map'
      break;
}

module.exports = {
    entry: entry,
    output: output,
    plugins: plugins,
    // 代理,将所有API接口都通过代理,调试用
    devtool: devtool,
    devServer: devServer,
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            }),
            new OptimizeCSSPlugin({}),
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        alias: {
            vue$: "vue/dist/vue.runtime.min.js",
            'src': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {test: /\.html$/,use:['html-loader']},
            {test: /\.vue$/,use:['vue-loader']},
            {test: /\.js$/,use: ['babel-loader'],include: [path.join(__dirname, 'src')]},
            {test: /\.css$/,use: ['vue-style-loader','css-loader','sass-loader']},
            {test: /\.scss$/,use: ['vue-style-loader','css-loader','sass-loader']},
            {test: /\.(png|jpe?g|gif)(\?.*)?$/,use: ['url-loader?limit=10000']},
            {test: /\.(woff|woff2?|svg|eot|ttf|otf)(\?.*)?$/,use:['url-loader'],}
        ]
    }
}