const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-firebase-chat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt x Firebase Chat' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  css: [
    '@/assets/scss/app.scss'
  ],
  modules: [
    ['bootstrap-vue/nuxt', { css: false }],
    '@nuxtjs/moment',
    '@nuxtjs/font-awesome',
    '@nuxtjs/axios'
  ],
  mode: 'spa',
  /*
  ** Build configuration
  */
  buildDir: '../functions/nuxt',
  build: {
    publicPath: '/assets/',
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.plugins.push(
        new webpack.EnvironmentPlugin([
          'APIKEY',
          'AUTHDOMAIN',
          'DATABASEURL',
          'PROJECTID',
          'STORAGEBUCKET',
          'MESSAGINGSENDERID'
        ])
      )
    }
  }
}
