import path from 'node:path';

import { PromptResult } from '../types';
import { VERSION_MAP } from '../constants';
import {
  readPackageJson,
  writeFileSafe,
  getPackageVersion,
  isVueProject,
  isTypeScriptProject,
  isReactProject,
} from '../utils';

interface PackageJson {
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  'simple-git-hooks'?: {
    'pre-commit': string;
  };
  'lint-staged'?: Record<string, string | string[]>;
  [key: string]: unknown;
}

/**
 * 更新 package.json 文件，添加必要的依赖和脚本
 * @param result 用户选择的配置选项
 */
export default async (result: PromptResult): Promise<void> => {
  const cwd = process.cwd();
  const pathPkgJson = path.join(cwd, 'package.json');

  // 读取并解析 package.json
  const pkg = await readPackageJson(cwd) as PackageJson;

  // 初始化必要的字段
  pkg.devDependencies ??= {};
  pkg.scripts ??= {};

  // 并行获取所有需要的包版本，提高性能
  const packageVersionPromises: Array<Promise<[string, string]>> = [];

  if (!pkg.devDependencies['hkx-eslint-config']) {
    packageVersionPromises.push(
      getPackageVersion('hkx-eslint-config').then((version) => ['hkx-eslint-config', version] as [string, string]),
    );
  }

  if (result.enableStylelint && !pkg.devDependencies['hkx-stylelint-config']) {
    packageVersionPromises.push(
      getPackageVersion('hkx-stylelint-config').then((version) => ['hkx-stylelint-config', version] as [string, string]),
    );
  }

  if (result.enableMarkdownlint && !pkg.devDependencies['hkx-markdownlint-config']) {
    packageVersionPromises.push(
      getPackageVersion('hkx-markdownlint-config').then((version) => ['hkx-markdownlint-config', version] as [string, string]),
    );
  }

  // 等待所有版本获取完成
  const packageVersions = await Promise.all(packageVersionPromises);
  const versionMap = new Map(packageVersions);

  // 处理 ESLint 相关
  if (!pkg.devDependencies['hkx-eslint-config']) {
    const version = versionMap.get('hkx-eslint-config');
    if (version) {
      pkg.devDependencies['hkx-eslint-config'] = `^${version}`;
    }
  }
  pkg.devDependencies.eslint ??= VERSION_MAP.eslint;
  pkg.scripts.lint ??= 'eslint .';
  pkg.scripts['lint:fix'] ??= 'eslint --fix';
  pkg.scripts['lint:check'] ??= 'eslint . --max-warnings 0';

  if (result.enablePrettier) {
    pkg.devDependencies.prettier ??= VERSION_MAP.prettier;
    pkg.devDependencies['eslint-config-prettier'] ??= VERSION_MAP['eslint-config-prettier'];
    pkg.scripts.prettier ??= 'prettier --write .';
    pkg.scripts['prettier:check'] ??= 'prettier --check .';
    pkg.scripts.format ??= 'prettier --write . && eslint . --fix';
  }

  // 处理 Stylelint 相关
  if (result.enableStylelint) {
    if (!pkg.devDependencies['hkx-stylelint-config']) {
      const version = versionMap.get('hkx-stylelint-config');
      if (version) {
        pkg.devDependencies['hkx-stylelint-config'] = `^${version}`;
      }
    }
    pkg.devDependencies.stylelint ??= VERSION_MAP.stylelint;

    const hasVue = isVueProject(result.projectType);
    const fileExtension = hasVue ? '{css,vue}' : 'css';

    if (hasVue) {
      pkg.devDependencies['postcss-html'] ??= VERSION_MAP['postcss-html'];
    }

    pkg.scripts['lint:style'] ??= `stylelint "**/*.${fileExtension}"`;
    pkg.scripts['lint:style:fix'] ??= `stylelint "**/*.${fileExtension}" --fix`;

    if (result.enablePrettier) {
      pkg.devDependencies['stylelint-config-prettier'] ??= VERSION_MAP['stylelint-config-prettier'];
      pkg.scripts['stylelint-check'] ??= 'stylelint-config-prettier-check';
    }
  }

  // 处理 markdownlint 相关
  if (result.enableMarkdownlint) {
    if (!pkg.devDependencies['hkx-markdownlint-config']) {
      const version = versionMap.get('hkx-markdownlint-config');
      if (version) {
        pkg.devDependencies['hkx-markdownlint-config'] = `^${version}`;
      }
    }
    pkg.devDependencies.markdownlint ??= VERSION_MAP.markdownlint;
  }

  // 处理 commit auto-fix 相关
  if (result.enableCommitlint) {
    pkg.devDependencies['simple-git-hooks'] ??= VERSION_MAP['simple-git-hooks'];
    pkg.devDependencies['lint-staged'] ??= VERSION_MAP['lint-staged'];

    pkg['simple-git-hooks'] ??= {
      'pre-commit': 'pnpm lint-staged',
    };

    // 根据项目类型确定需要 lint 的文件类型
    const hasTypeScript = isTypeScriptProject(result.projectType);
    const hasReactOrVue = isReactProject(result.projectType) || isVueProject(result.projectType);
    const hasVue = isVueProject(result.projectType);

    const fileTypeConfig = [
      { condition: true, types: ['js'] },
      { condition: hasTypeScript, types: ['ts'] },
      { condition: hasReactOrVue, types: ['jsx'] },
      { condition: hasReactOrVue && hasTypeScript, types: ['tsx'] },
      { condition: hasVue, types: ['vue'] },
    ];

    const fileTypes = fileTypeConfig
      .filter(({ condition }) => condition)
      .flatMap(({ types }) => types);

    // 生成 lint-staged 配置
    const lintStagedPattern = fileTypes.length === 1 ? `*.${fileTypes[0]}` : `*.{${fileTypes.join(',')}}`;
    const lintStagedCommands = result.enablePrettier ? ['eslint --fix', 'prettier --write'] : ['eslint --fix'];

    pkg['lint-staged'] ??= {
      [lintStagedPattern]: lintStagedCommands,
    };
  }

  // 写入更新后的 package.json
  const packageJsonContent = JSON.stringify(pkg, null, 2);
  await writeFileSafe(pathPkgJson, packageJsonContent, 'package.json', 'package.json updated!');
};
