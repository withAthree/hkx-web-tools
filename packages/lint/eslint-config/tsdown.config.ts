import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './index.ts',
    node: './node.ts',
    vue: './vue.ts',
    'typescript/index': './typescript/index.ts',
    'typescript/vue': './typescript/vue.ts',
    'typescript/node': './typescript/node.ts',
  },
  dts: true,
  shims: true,
  format: ['esm'],
});
