import * as bestPracticesConfig from './base/best-practices';
import * as possibleErrorsConfig from './base/possible-errors';
import * as styleConfig from './base/style';
import * as variablesConfig from './base/variables';
import * as es6Config from './base/es6';
import * as strictConfig from './base/strict';
import * as importConfig from './base/import';

export const name = 'eslint-config/recommended-javascript';

export const plugins: any = {
  ...bestPracticesConfig.plugins,
  ...possibleErrorsConfig.plugins,
  ...styleConfig.plugins,
  ...es6Config.plugins,
  ...importConfig.plugins,
};

export const settings = {
  ...importConfig.settings,
};

export const rules = {
  ...bestPracticesConfig.rules,
  ...possibleErrorsConfig.rules,
  ...styleConfig.rules,
  ...es6Config.rules,
  ...importConfig.rules,
  ...variablesConfig.rules,
  ...strictConfig.rules,
};

const config: any = { name, plugins, settings, rules };
export default config;
