import globals from 'globals';
import eslintPlugin from '../plugin';


export default [{
  files: ['**/*.js'],
  extends: [eslintPlugin.configs.js, eslintPlugin.configs.node],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
}];
