import typescript from '../rules/typescript';
import index from '../index';

import tseslint from 'typescript-eslint';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

export default [
  ...index,
  ...typescript,
  {
    name: 'eslint-config/typescript/index',
    files: ['*.{ts,tsx}', '**/*.{ts,tsx}'],
    settings: {
      'import/parsers': {
        [tseslint.parser as any]: ['.ts', '.d.ts', '.tsx'],
      },
      // Use eslint-import-resolver-typescript
      'import/resolver': {
        typescript: {},
      },
      // Append 'ts' extensions to 'import/extensions' setting
      'import/extensions': ['.js', '.ts', '.mjs'],
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
