import { defineConfig } from 'eslint/config';
import vueTsConfig from '../typescript/vue';
import vueJsConfig from '../vue';
import typescriptConfig from '../typescript/index';

export default defineConfig([
  ...vueTsConfig,
]);
