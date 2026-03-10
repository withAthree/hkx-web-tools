import globals from 'globals';
import eslintPlugin from '../plugin';

export default [{
  files: ['**/*.js', '**/*.jsx'],
  extends: [eslintPlugin.configs.js, eslintPlugin.configs.react],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
    },
  },
}];
