import tseslint from 'typescript-eslint';

import jsIndex from '../index';
import tsRules from '../rules/typescript';
import vueRules from '../rules/vue';
import jsxA11y from '../rules/jsx-a11y';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

export default [
  {
    name: 'eslint-config/typescript/vue',
    extends: [jsIndex, jsxA11y, tsRules, vueRules],
    files: ['**/*.{ts,tsx,js,jsx,vue}'],
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
      'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
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
