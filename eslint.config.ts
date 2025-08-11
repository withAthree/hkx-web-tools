import { defineConfig } from 'eslint/config';

import tseslintConfig from './packages/lint/eslint-config/typescript/index.js'

export default defineConfig(tseslintConfig)