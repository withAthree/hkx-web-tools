import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  outDir: 'dist',
  fixedExtension: false,
  platform: 'node',
  shims: true,
  format: ['esm'],
  treeshake: true,
  minify: true,
  dts: true,
  hash: false,
  sourcemap: false,
  clean: true,
});
