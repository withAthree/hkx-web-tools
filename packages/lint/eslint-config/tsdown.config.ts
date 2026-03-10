import { type UserConfig, defineConfig } from 'tsdown';

const config = {
  entry: ['./index.ts'],
  outDir: 'dist',
  format: ['esm'],
  fixedExtension: false,
  platform: 'node',
  dts: true,
  hash: false,
  deps: {
    neverBundle: ['eslint', 'typescript'],
  },
  treeshake: true,
  minify: false,
  sourcemap: false,
  clean: true,
};

export default defineConfig(config as UserConfig);
