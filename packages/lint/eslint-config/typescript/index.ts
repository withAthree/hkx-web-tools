import typescript from '../rules/typescript';
import index from '../index';

import tseslint from 'typescript-eslint';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

export default [
  ...index,
  ...typescript,
  {
    name: 'eslint-config/typescript/index',
    files: ['*.{ts,tsx}', '**/*.{ts,tsx}'],
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
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          globalReturn: false,
          jsx: true,
        },
        projectService: {
          allowDefaultProject: ['*.js'],
        },
      },
    },
  },
] as ConfigWithExtendsArray;
