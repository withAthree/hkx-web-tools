import globals from 'globals';
import recommendedJavascript from '../rules/recommended-javascript';
import react from '../rules/react';

const config: any = [{
  files: ['**/*.js', '**/*.jsx'],
  extends: [recommendedJavascript, react],
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

export default config;
