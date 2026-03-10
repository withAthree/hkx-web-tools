import type { ESLint, Linter } from 'eslint';

import { name, version } from '../package.json';

import * as recommendedJavascriptConfig from './configs/recommended-javascript';
import * as recommendedTypescriptConfig from './configs/recommended-typescript';
import * as nodeConfig from './configs/node';
import * as reactConfig from './configs/react';
import * as vueConfig from './configs/vue';

type ConfigName = 'js' | 'ts' | 'node' | 'react' | 'vue';

const plugin: ESLint.Plugin & {
  configs: Partial<Record<ConfigName, Linter.Config>>
} = {
  meta: {
    name,
    version,
  },
  configs: {
    js: recommendedJavascriptConfig as unknown as Linter.Config,
    ts: recommendedTypescriptConfig as unknown as Linter.Config,
    node: nodeConfig as unknown as Linter.Config,
    react: reactConfig as unknown as Linter.Config,
    vue: vueConfig as unknown as Linter.Config,
  },
};

export default plugin;
