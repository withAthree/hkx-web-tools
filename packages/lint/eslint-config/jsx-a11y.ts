import jsxA11y from './rules/jsx-a11y';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';

export default [
  {
    name: 'eslint-config/jsx-a11y',
  },
  ...jsxA11y,
] as ConfigWithExtendsArray;
