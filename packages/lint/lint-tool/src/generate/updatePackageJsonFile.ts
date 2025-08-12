import { PromptResult } from '../types';

// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';
import { getEslintConfigVersion } from '../utils';
import { VERSION_MAP } from '../constants';

export default async (result: PromptResult): Promise<void> => {
  const cwd = process.cwd();

  const pathPkgJson = path.join(cwd, 'package.json');
  const pkgJsonContent = fs.readFileSync(pathPkgJson, 'utf-8');
  const pkg: Record<string, any> = JSON.parse(pkgJsonContent);

  // 处理 eslint 相关
  pkg.devDependencies ??= {};
  pkg.devDependencies['hkx-eslint-config'] = `^${await getEslintConfigVersion()}`;
  pkg.devDependencies.eslint ??= VERSION_MAP.eslint;
  pkg.scripts ??= {};
  pkg.scripts.lint = 'eslint';
  pkg.scripts['lint:fix'] = 'eslint --fix';

  // 处理 Stylelint 相关
  if (result.enableStylelint) {
    /** TODO */
  }

  // 处理 markdownlint 相关
  if (result.enableMarkdownlint) {
    /** TODO */
  }

  // 处理 commitlint 相关
  if (result.enableCommitlint) {
    /** TODO */
  }

  await fs.writeFileSync(pathPkgJson, JSON.stringify(pkg, null, 2));
  p.log.success(c.green`更改已写入 package.json ！`);
};
