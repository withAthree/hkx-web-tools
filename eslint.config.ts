import { defineConfig } from 'eslint/config';

import { configs } from 'hkx-eslint-config';


export default defineConfig([
  ...configs.nodeTs as any[],
  {
    ignores: ['**/node_modules/*', '**/dist/*', '**/__tests__/**/*', '**/.husky/**/*', '**/.idea/**/*', '**/.vscode/**/*'],
  },
]);
