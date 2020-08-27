module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  outputRoot: process.env.TARO_BUILD_TYPE === 'ui' ? 'dist' : 'dev'
}
