import tseslint from 'typescript-eslint';

import jsIndex from '../index';
import tsRules from '../rules/typescript';
import vueRules from '../rules/vue';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

export default [
  {
    extends: [jsIndex, tsRules, vueRules],
    files: ['**/*.{ts,tsx,js,jsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: {
          ts: tseslint.parser,
          tsx: tseslint.parser,
          js: 'espree',
          jsx: 'espree',
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
] as ConfigWithExtendsArray;
