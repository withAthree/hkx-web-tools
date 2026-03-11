import * as vueConfig from './base/vue';

export const name = 'eslint-config/vue';

export const plugins = {
  ...vueConfig.plugins,
};

export const rules = {
  ...vueConfig.rules,
};

const config = { name, plugins, rules };
export default config;
