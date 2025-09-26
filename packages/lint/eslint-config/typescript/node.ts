import tseslint from 'typescript-eslint';

import jsIndex from '../index';
import tsRules from '../rules/typescript';
import node from '../rules/node';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export default [
  {
    name: 'eslint-config/typescript/node',
    extends: [jsIndex, tsRules, node],
    files: ['**/*.{ts,js}'],
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
      'import-x/extensions': ['.js', '.ts'],
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
] as ConfigWithExtendsArray;
