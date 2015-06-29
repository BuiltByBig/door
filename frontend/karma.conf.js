var webpackConfig = require('./webpack.test.config')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      'phantomjs-shim',
      'chai',
      'chai-sinon'
    ],
    files: [
      'test/**/*-test.js'
    ],
    preprocessors: {
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackServer: {
      //quiet: true,
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatchBatchDelay: 500,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      //'Chrome',
      'PhantomJS'
    ],
    reporters: [
      'nyan',
      'clear-screen'
    ],
    captureTimeout: 60000,
    singleRun: true
  })
}
