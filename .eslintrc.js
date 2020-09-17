const onlyProductionError = process.env.NODE_ENV === 'production' ? 'error' : 'off'
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console':onlyProductionError,
    'no-debugger': onlyProductionError,
  }
}
