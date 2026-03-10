import globals from 'globals';
import eslintPlugin from '../plugin';
import tseslint from 'typescript-eslint';

export default [{
  files: ['**/*.ts', '**/*.tsx'],
  extends: [eslintPlugin.configs.ts, eslintPlugin.configs.react],
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
