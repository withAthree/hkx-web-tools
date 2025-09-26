// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';
// @ts-expect-error missing types
import parse from 'parse-gitignore';

import { getEslintConfigContent } from '../utils';
import { PromptResult } from '../types';

export default async (result: PromptResult): Promise<void> => {
  const cwd = process.cwd();

  const { projectType, enableExtraFormatter } = result;

  const pathESLintIgnore = path.join(cwd, '.eslintignore');
  const pathPkgJson = path.join(cwd, 'package.json');
  const pkgJsonContent = fs.readFileSync(pathPkgJson, 'utf-8');
  const pkg: Record<string, any> = JSON.parse(pkgJsonContent);

  let ext = projectType.includes('typescript') ? 'ts' : 'js';
  ext = pkg.type !== 'module' ? `m${ext}` : ext;
  const configFileName = `eslint.config.${ext}`;
  const pathFlatConfig = path.join(cwd, configFileName);

  const eslintIgnores: string[] = [];
  if (fs.existsSync(pathESLintIgnore)) {
    p.log.step(c.cyan`Update existing .eslintignore file!`);
    const content = await fs.readFileSync(pathESLintIgnore, 'utf-8');
    const parsed = parse(content);
    const globs = parsed.globs();

    for (const glob of globs) {
      if (glob.type === 'ignore') {
        eslintIgnores.push(...glob.patterns);
      } else if (glob.type === 'unignore') {
        eslintIgnores.push(...glob.patterns.map((pattern: string) => `!${pattern}`));
      }
    }
  }

  let configLines = null;
  if (eslintIgnores.length) {
    configLines = `ignores: ${JSON.stringify(eslintIgnores)},`;
  }

  const eslintConfigContent = getEslintConfigContent(projectType, configLines, enableExtraFormatter);
  await fs.writeFile(pathFlatConfig, eslintConfigContent);
  p.log.success(c.green`${configFileName} created!`);

  const files = fs.readdirSync(cwd);
  const legacyConfig: string[] = [];
  files.forEach((file: string) => {
    if (/eslint|prettier/.test(file) && !/eslint\.config\./.test(file)) legacyConfig.push(file);
  });

  if (legacyConfig.length) p.note(c.dim(legacyConfig.join(', ')), 'You can manually delete these files!');
};
