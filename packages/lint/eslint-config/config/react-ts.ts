import globals from 'globals';
import recommendedTypescript from '../rules/recommended-typescript';
import react from '../rules/react';
import tseslint from 'typescript-eslint';

const config: any = [{
  files: ['**/*.ts', '**/*.tsx'],
  extends: [recommendedTypescript, react],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
    globals: {
      ...globals.browser,
    },
  },
}];

export default config;
