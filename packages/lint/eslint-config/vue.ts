import vueRules from './rules/vue';
import index from './index';
import jsxA11y from "./rules/jsx-a11y";

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

export default [
  {
    extends: [index, vueRules, jsxA11y],
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
