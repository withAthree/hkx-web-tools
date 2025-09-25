import { PromptResult } from '../types';

import path from 'node:path';
// @ts-expect-error missing types
import fs from 'fs-extra';
import * as p from '@clack/prompts';
import c from 'ansis';
import { MARKDOWNLINT_CONFIG } from '../constants';

export default async (result: PromptResult): Promise<void> => {
  if (!result.enableMarkdownlint) {
    return undefined;
  }
  const cwd = process.cwd();

  const configPath = path.join(cwd, '.markdownlint.json');

  fs.ensureFileSync(configPath);

  fs.writeFile(configPath, MARKDOWNLINT_CONFIG, 'utf-8');

  p.log.success(c.green`.markdownlint.json updated!`);
};
