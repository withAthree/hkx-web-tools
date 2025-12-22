import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';
// @ts-expect-error missing types
import parse from 'parse-gitignore';
// @ts-expect-error missing types
import fs from 'fs-extra';

import {
  getEslintConfigContent,
  readPackageJson,
  writeFileSafe,
  getConfigFileExtension,
  fileExists,
} from '../utils';
import { PromptResult } from '../types';

/**
 * 生成 ESLint 配置文件
 * @param result 用户选择的配置选项
 */
export default async (result: PromptResult): Promise<void> => {
  const cwd = process.cwd();
  const { projectType, enableExtraFormatter } = result;

  // 读取并解析 package.json
  const pkg = await readPackageJson(cwd);

  // 确定配置文件扩展名
  const fileExtension = getConfigFileExtension(projectType, pkg.type);
  const configFileName = `eslint.config.${fileExtension}`;
  const pathFlatConfig = path.join(cwd, configFileName);

  // 处理 .eslintignore 文件
  const pathESLintIgnore = path.join(cwd, '.eslintignore');
  const eslintIgnores: string[] = [];
  if (await fileExists(pathESLintIgnore)) {
    p.log.step(c.cyan`Update existing .eslintignore file!`);
    try {
      const content = await fs.readFile(pathESLintIgnore, 'utf-8');
      const parsed = parse(content);
      const globs = parsed.globs();

      for (const glob of globs) {
        if (glob.type === 'ignore') {
          eslintIgnores.push(...glob.patterns);
        } else if (glob.type === 'unignore') {
          eslintIgnores.push(...glob.patterns.map((pattern: string) => `!${pattern}`));
        }
      }
    } catch (error) {
      p.log.warn(c.yellow`Failed to parse .eslintignore file: ${String(error)}`);
    }
  }

  // 生成配置内容
  let configLines: string | null = null;
  if (eslintIgnores.length > 0) {
    configLines = `ignores: ${JSON.stringify(eslintIgnores)},`;
  }

  const eslintConfigContent = getEslintConfigContent(projectType, configLines, enableExtraFormatter);

  // 写入配置文件
  await writeFileSafe(pathFlatConfig, eslintConfigContent, configFileName);

  // 检查并提示删除旧的配置文件
  try {
    const files = await fs.readdir(cwd);
    const legacyConfig: string[] = [];
    for (const file of files) {
      if (/eslint|prettier/.test(file) && !/eslint\.config\./.test(file)) {
        legacyConfig.push(file);
      }
    }

    if (legacyConfig.length > 0) {
      p.note(c.dim(legacyConfig.join(', ')), 'You can manually delete these files!');
    }
  } catch (error) {
    // 读取目录失败不影响主流程，只记录警告
    p.log.warn(c.yellow`Failed to check legacy config files: ${String(error)}`);
  }
};
