import recommendedTypescript from '../rules/recommended-typescript';
import tseslint from 'typescript-eslint';

const config: any = [{
  files: ['**/*.ts'],
  extends: [recommendedTypescript],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
}];

export default config;
