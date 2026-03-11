import { defineConfig } from 'eslint/config';

import nodeTs from 'hkx-eslint-config/node-ts';

export default defineConfig([
  ...nodeTs,
  {
    ignores: ['**/node_modules/*', '**/dist/*', '**/__tests__/**/*', '**/.husky/**/*', '**/.idea/**/*', '**/.vscode/**/*'],
  },
]);
