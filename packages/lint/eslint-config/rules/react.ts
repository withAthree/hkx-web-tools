import * as reactConfig from './base/react';

export const name = 'eslint-config/react';

export const plugins: any = {
  ...reactConfig.plugins,
};

export const rules = {
  ...reactConfig.rules,
};

const config: any = { name, plugins, rules };
export default config;
