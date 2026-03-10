import eslintPlugin from '../plugin';
import tseslint from 'typescript-eslint';

export default [{
  files: ['**/*.ts'],
  extends: [eslintPlugin.configs.ts],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
}];
