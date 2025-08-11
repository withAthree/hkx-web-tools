import { defineConfig } from 'eslint/config';
import vueTsConfig from '../typescript/vue.js';
import vueJsConfig from '../vue.js';
import typescriptConfig from '../typescript/index.js';

export default defineConfig([
  ...vueTsConfig,
]);
