import * as bestPracticesConfig from './rules/best-practices';
import * as possibleErrorsConfig from './rules/possible-errors';
import * as styleConfig from './rules/style';
import * as variablesConfig from './rules/variables';
import * as es6Config from './rules/es6';
import * as strictConfig from './rules/strict';
import * as importConfig from './rules/import';
import * as typescriptConfig from './rules/typescript';
import { RuleConfig } from '../type';

export const name = 'eslint-config/recommended-typescript';

export const plugins = {
  ...bestPracticesConfig.plugins,
  ...possibleErrorsConfig.plugins,
  ...styleConfig.plugins,
  ...es6Config.plugins,
  ...importConfig.plugins,
  ...typescriptConfig.plugins,
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
  ...typescriptConfig.rules,
  ...variablesConfig.rules,
  ...strictConfig.rules,
} as const satisfies Record<string, RuleConfig>;
