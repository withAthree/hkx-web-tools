import globals from 'globals';
import recommendedTypescript from '../rules/recommended-typescript';
import node from '../rules/node';
import tseslint from 'typescript-eslint';

const config: any = [{
  files: ['**/*.ts'],
  extends: [recommendedTypescript, node],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
    globals: {
      ...globals.node,
    },
  },
}];

export default config;
