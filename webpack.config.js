const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DEV = process.env.NODE_ENV === 'development';
let config = {
    entry: {
        cityselector: path.resolve(__dirname, './src/CitySelector.jsx'),
        example: path.resolve(__dirname, './demo/examples.js')
    },
    output: {
        publicPath: DEV ? 'dist': './',
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ["react", "env"]
                }
            }]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
        ]
    },
    resolve: {
        alias: {
            'react-city-selector': path.resolve(__dirname, 'src/CitySelector'),
        },
        extensions: ['.js', '.jsx', '.css'] //后缀名自动补全
    },
    plugins: []
};

if (DEV) {
    //新版的webpack要定义配置模式一般只有development 和 production两种
    config.mode = 'development',
    //webpack压缩资源到devServer资源的一个映射,这个用eval过的版本比较好，
    config.devtool = 'cheap-module-eval-source-map';
    //webpack devserver的配置
    config.devServer = {
        //端口
        port: 8888,
        //主机
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        //热替换
        hot: true
    };
    //自动打开浏览器和热替换的插件，貌似react不支持
    config.plugins.push(
        new OpenBrowserPlugin({ url: 'http://127.0.0.1:8888/demo/index.html' }),
        new webpack.HotModuleReplacementPlugin()
    );
} else {
    config.mode = 'production';
    config.plugins.push(new ExtractTextPlugin('cityselector.css'));
    //webpack4将压缩插件的配置移到了配置的optimization
    config.optimization = {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: true,
                    sourceMap: false,
                    commits: false
                }
            })
        ]
    };
    config.module.rules[1].use = ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
            loader: 'css-loader',
            options: {
                minimize: true //css压缩
            }
        }]
    });
}
module.exports = config;