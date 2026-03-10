import globals from 'globals';
import eslintPlugin from '../plugin';
import tseslint from 'typescript-eslint';

export default [{
  files: ['**/*.ts'],
  extends: [eslintPlugin.configs.ts, eslintPlugin.configs.node],
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
