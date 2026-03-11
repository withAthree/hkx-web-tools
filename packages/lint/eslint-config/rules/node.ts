import * as nodeConfig from './base/node';

export const name = 'eslint-config/node';

export const plugins = {
  ...nodeConfig.plugins,
};

export const rules = {
  ...nodeConfig.rules,
};

const config = { name, plugins, rules };
export default config;
