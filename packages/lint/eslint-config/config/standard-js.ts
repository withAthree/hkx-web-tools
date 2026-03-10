import eslintPlugin from '../plugin';

export default [{
  files: ['**/*.js'],
  extends: [eslintPlugin.configs.js],
}];
