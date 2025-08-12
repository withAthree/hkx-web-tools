import node from './rules/node';
import index from './index';

import type { ConfigWithExtendsArray } from '@eslint/config-helpers';


export default [
  {
    name: 'eslint-config/node',
    extends: [node, index],
    files: ['*.js', '**/*.js'],
  },
] as ConfigWithExtendsArray;
