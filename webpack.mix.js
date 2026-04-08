let mix = require('laravel-mix')
let path = require('path')

mix.setPublicPath('dist')
    .js('resources/js/field.js', 'js')
    .vue({ version: 3 })
    .sass('resources/sass/field.scss', 'css')
    .webpackConfig({
        externals: {
            vue: 'Vue',
        },
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                'laravel-nova': path.resolve(__dirname, '../../laravel/nova/resources/js/mixins/packages.js'),
            },
        },
    })
