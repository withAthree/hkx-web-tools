import * as nodeConfig from './rules/node';

import { RuleConfig } from '../type';

export const name = 'eslint-config/node';

export const plugins = {
  ...nodeConfig.plugins,
};

export const rules = {
  ...nodeConfig.rules,
} as const satisfies Record<string, RuleConfig>;
