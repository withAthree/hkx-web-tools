import type { ESLint, Linter } from 'eslint';

import jsConfig from './config/standard-js';
import nodeConfig from './config/node-js';
import reactConfig from './config/react-js';
import vueConfig from './config/vue-js';

import tsConfig from './config/standard-ts';
import vueTsConfig from './config/vue-ts';
import reactTsConfig from './config/react-ts';
import nodeTsConfig from './config/node-ts';

import pluginExport from './plugin';

export const configs: Record<string, Linter.Config[] | unknown> = {
  js: jsConfig,
  ts: tsConfig,
  node: nodeConfig,
  react: reactConfig,
  vue: vueConfig,
  vueTs: vueTsConfig,
  reactTs: reactTsConfig,
  nodeTs: nodeTsConfig,
};

export const plugin: ESLint.Plugin = pluginExport;
