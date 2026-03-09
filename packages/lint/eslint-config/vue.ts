import vueRules from './rules/vue';
import index from './index';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

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
] as ConfigWithExtendsArray;
