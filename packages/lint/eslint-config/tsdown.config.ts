import { type UserConfig, defineConfig } from 'tsdown';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pkg = JSON.parse(readFileSync(resolve('./package.json'), 'utf-8'));
const dependencies = Object.keys(pkg.dependencies ?? {});

const config = {
  entry: [
    './config/node-js.ts',
    './config/node-ts.ts',
    './config/react-js.ts',
    './config/react-ts.ts',
    './config/standard-js.ts',
    './config/standard-ts.ts',
    './config/vue-js.ts',
    './config/vue-ts.ts',
    './rules/recommended-javascript.ts',
    './rules/recommended-typescript.ts',
    './rules/node.ts',
    './rules/react.ts',
    './rules/vue.ts',
  ],
  outDir: 'dist',
  format: ['esm'],
  fixedExtension: false,
  platform: 'node',
  dts: true,
  hash: false,
  deps: {
    neverBundle: [...dependencies, 'eslint', 'typescript'],
  },
  treeshake: true,
  minify: false,
  sourcemap: false,
  clean: true,
};

export default defineConfig(config as UserConfig);
