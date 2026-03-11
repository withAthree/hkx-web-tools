import globals from 'globals';
import recommendedJavascript from '../rules/recommended-javascript';
import node from '../rules/node';

const config = [{
  files: ['**/*.js'],
  extends: [recommendedJavascript, node],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
}];

export default config;
