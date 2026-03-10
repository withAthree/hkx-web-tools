import * as reactConfig from './rules/react';

import { RuleConfig } from '../type';

export const name = 'eslint-config/react';

export const plugins = {
  ...reactConfig.plugins,
};

export const rules = {
  ...reactConfig.rules,
} as const satisfies Record<string, RuleConfig>;
