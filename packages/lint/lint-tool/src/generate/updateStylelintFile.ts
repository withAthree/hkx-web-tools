import { PromptResult } from '../types';

// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';

import type { Config } from 'stylelint';

export default async (result: PromptResult) => {
  const cwd = process.cwd();

  const { projectType, enableStylelint } = result;

  if (!enableStylelint) {
    return undefined;
  }

  const configFileName = '.stylelintrc.mjs';

  const pathConfig = path.join(cwd, configFileName);

  const config: Config = {
    extends: ['hkx-stylelint-config'],
  };

  if (projectType.includes('vue')) {
    config.overrides = [
      {
        files: ['**/*.vue'],
        customSyntax: 'postcss-html',
      },
    ];
  }

  await fs.writeFile(pathConfig, `export default ${JSON.stringify(config, null, 2)}`);
  p.log.success(c.green`${configFileName} created!`);
};
