module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  outputRoot: process.env.TARO_BUILD_TYPE === 'ui' ? 'dist' : 'dev'
}
