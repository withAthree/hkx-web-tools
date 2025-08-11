import { defineConfig } from 'eslint/config';

import tseslintConfig from './packages/lint/eslint-config/typescript/index';

export default defineConfig(tseslintConfig);
