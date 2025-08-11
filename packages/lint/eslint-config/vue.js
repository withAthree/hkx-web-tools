import vueRules from './rules/vue.js';
import index from './index.js';

export default [
  {
    extends: [index, vueRules],
    files: ['**/*.{js,jsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: 'espree',
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: true,
        },
      },
    },
  },
];
