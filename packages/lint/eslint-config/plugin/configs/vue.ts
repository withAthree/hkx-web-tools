import * as vueConfig from './rules/vue';

import { RuleConfig } from '../type';

export const name = 'eslint-config/vue';

export const plugins = {
  ...vueConfig.plugins,
};


export const rules = {
  ...vueConfig.rules,
} as const satisfies Record<string, RuleConfig>;
