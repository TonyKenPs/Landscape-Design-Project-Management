const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
const production = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false,
    runtimeCompiler: true,
    transpileDependencies: [],
    productionSourceMap: false,
    configureWebpack: config => {
        if (debug) {
            //开发环境1
            config.devtool = 'eval-cheap-module-source-map';
        } else {
            //生产
        }
    },

    chainWebpack: config => {
        if (debug) {
            
        } else {
            //生产
        }
    },
    //parallel: require('os').cpus().length > 1,
    pluginOptions: {

    },
    pwa: {

    },
    devServer: {
        open: false,
        host: 'localhost',
        port: 8080,
        https: false,
        //hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:34586/api/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        //before: app => {}
    }
};