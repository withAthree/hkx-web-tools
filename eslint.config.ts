import { defineConfig } from 'eslint/config';

import tseslintConfig from 'hkx-eslint-config/typescript/node';

export default defineConfig([
  ...tseslintConfig,
  {
    ignores: ['**/node_modules/*', '**/dist/*', '**/__tests__/**/*'],
  },
]);
