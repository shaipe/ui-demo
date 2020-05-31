
const common = require('./common')

const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const APP_ENV = process.env.APP_ENV || 'prod'

module.exports = APP_ENV == 'dev' ? {}:  {
    runtimeChunk: {
        name: 'manifest'
    },
    splitChunks: {
        cacheGroups: {
            default: false,
            buildup: {
                chunks: 'all',
                test: /[\\/]node_modules[\\/]/
            },
            vendor: {
                name: 'vendor',
                test: /[\\/]node_modules[\\/](react|react-dom|lodash|moment|immutable|mobx|mobx-react|axios)[\\/]/,
                chunks: 'all',
                priority: 10
            }
        }
    },
    minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: Boolean(common.sourceMap)
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                reduceIdents: false,
                autoprefixer: false
            }
        })
    ]
};

