import { PromptResult } from '../types';

// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';
import { getPackageVersion } from '../utils';
import { VERSION_MAP } from '../constants';

export default async (result: PromptResult): Promise<void> => {
  const cwd = process.cwd();

  const pathPkgJson = path.join(cwd, 'package.json');
  const pkgJsonContent = fs.readFileSync(pathPkgJson, 'utf-8');
  const pkg: Record<string, any> = JSON.parse(pkgJsonContent);

  // 处理 eslint 相关
  pkg.devDependencies ??= {};
  pkg.devDependencies['hkx-eslint-config'] ??= `^${await getPackageVersion('hkx-eslint-config')}`;
  pkg.devDependencies.eslint ??= VERSION_MAP.eslint;
  pkg.scripts ??= {};
  pkg.scripts.lint ??= 'eslint';
  pkg.scripts['lint:fix'] ??= 'eslint --fix';

  // 处理 Stylelint 相关
  if (result.enableStylelint) {
    pkg.devDependencies['hkx-stylelint-config'] ??= `^${await getPackageVersion('hkx-stylelint-config')}`;
    pkg.devDependencies.stylelint ??= VERSION_MAP.stylelint;
  }

  // 处理 markdownlint 相关
  if (result.enableMarkdownlint) {
    pkg.devDependencies['hkx-markdownlint-config'] ??= `^${await getPackageVersion('hkx-markdownlint-config')}`;
    pkg.devDependencies.markdownlint ??= VERSION_MAP.markdownlint;
  }

  // 处理 commit auto-fix 相关
  if (result.enableCommitlint) {
    pkg.devDependencies['simple-git-hooks'] ??= VERSION_MAP['simple-git-hooks'];
    pkg.devDependencies['lint-staged'] ??= VERSION_MAP['lint-staged'];

    pkg['simple-git-hooks'] ??= {
      'pre-commit': 'pnpm lint-staged',
    };

    const hasTypeScript = result.projectType.includes('typescript');
    const hasReactOrVue = result.projectType.includes('react') || result.projectType.includes('vue');
    const hasVue = result.projectType.includes('vue');

    const fileTypeConfig = [
      { condition: true, types: ['js'] },
      { condition: hasTypeScript, types: ['ts'] },
      { condition: hasReactOrVue, types: ['jsx'] },
      { condition: hasReactOrVue && hasTypeScript, types: ['tsx'] },
      { condition: hasVue, types: ['vue'] },
    ];

    const fileTypes = fileTypeConfig.reduce((acc, { condition, types }) => {
      if (condition) acc.push(...types);
      return acc;
    }, [] as string[]);

    if (fileTypes.length === 1) {
      pkg['lint-staged'] ??= {
        [`*.${fileTypes[0]}`]: 'eslint --fix',
      };
    } else {
      pkg['lint-staged'] ??= {
        [`*.{${fileTypes.join(',')}}`]: 'eslint --fix',
      };
    }
  }

  await fs.writeFile(pathPkgJson, JSON.stringify(pkg, null, 2));

  p.log.success(c.green`更改已写入 package.json ！`);
};
