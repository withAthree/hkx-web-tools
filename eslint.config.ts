import { defineConfig } from 'eslint/config';

import tseslintConfig from '@hkx/eslint-config/typescript/vue';

export default defineConfig([
  ...tseslintConfig,
  {
    ignores: ['**/node_modules/*', '**/dist/*', '**/__tests__/fixture/*'],
  },
]);
