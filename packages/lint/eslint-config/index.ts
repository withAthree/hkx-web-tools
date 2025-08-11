import bestPractices from './rules/base/best-practices';
import possibleErrors from './rules/base/possible-errors';
import style from './rules/base/style';
import variables from './rules/base/variables';
import es6 from './rules/base/es6';
import strict from './rules/base/strict';
import importConfig from './rules/import';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

export default [
  ...bestPractices,
  ...possibleErrors,
  ...style,
  ...variables,
  ...es6,
  ...strict,
  ...importConfig,
  {
    name: 'eslint-config/index',
    files: ['*.{js,jsx}', '**/*.{jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: true,
        },
      },
    },
  },
] as ConfigWithExtendsArray;
