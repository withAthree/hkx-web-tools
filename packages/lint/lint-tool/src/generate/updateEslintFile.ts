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

  const { projectType } = result;

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
    p.log.step(c.cyan`迁移现有的 .eslintignore 文件`);
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

  const eslintConfigContent = getEslintConfigContent(projectType, configLines);
  await fs.writeFile(pathFlatConfig, eslintConfigContent);
  p.log.success(c.green`${configFileName} 已创建`);

  const files = fs.readdirSync(cwd);
  const legacyConfig: string[] = [];
  files.forEach((file) => {
    if (/eslint|prettier/.test(file) && !/eslint\.config\./.test(file)) legacyConfig.push(file);
  });

  if (legacyConfig.length) p.note(c.dim(legacyConfig.join(', ')), '你可以手动删除这些文件');
};
