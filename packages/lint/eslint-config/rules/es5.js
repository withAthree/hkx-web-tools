import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    name: 'rules/es5',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // 逗号风格 - ES5 中不加最后一个逗号
      // @unessential
      '@stylistic/comma-dangle': ['error', 'never'],
    }
  },
]