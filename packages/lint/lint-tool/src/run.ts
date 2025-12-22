// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';

import { CliRunOptions, ProjectType, PromptResult } from './types';
import { PROJECT_TYPE, UN_DEV } from './constants';
import updateEslintFile from './generate/updateEslintFile';
import updatePackageJsonFile from './generate/updatePackageJsonFile';
import updateVscodeSettingFile from './generate/updateVscodeSettingFile';
import updateStylelintFile from './generate/updateStylelintFile';

/**
 * ESLint 配置文件名称列表
 */
const ESLINT_CONFIG_FILES = [
  'eslint.config.js',
  'eslint.config.ts',
  'eslint.config.mjs',
  'eslint.config.mts',
] as const;

/**
 * 默认配置选项
 */
const DEFAULT_CONFIG: PromptResult = {
  projectType: 'index',
  enableStylelint: false,
  enableMarkdownlint: false,
  enableCommitlint: true,
  enableExtraFormatter: true,
  updateVscodeSetting: true,
};

/**
 * 检查是否存在现有的 ESLint 配置文件
 * @returns 如果存在配置文件，返回文件名；否则返回 undefined
 */
async function checkExistingConfig(): Promise<string | undefined> {
  const cwd = process.cwd();
  const checks = await Promise.all(
    ESLINT_CONFIG_FILES.map(async (file) => {
      const filePath = path.join(cwd, file);
      const exists = await fs.pathExists(filePath);
      return exists ? file : undefined;
    }),
  );
  return checks.find((file) => file !== undefined);
}

/**
 * 获取被禁用的项目类型列表
 */
function getDisabledProjectTypes() {
  return PROJECT_TYPE.filter((item) => item.label.includes(UN_DEV));
}

/**
 * 验证项目类型是否可用
 * @param projectType 项目类型
 * @param disabledTypes 被禁用的项目类型列表
 */
function validateProjectType(projectType: ProjectType, disabledTypes: typeof PROJECT_TYPE): void {
  const isDisabled = disabledTypes.some((item) => item.value === projectType);
  if (isDisabled) {
    const projectTypeOption = PROJECT_TYPE.find((item) => item.value === projectType);
    const projectName = projectTypeOption ? projectTypeOption.label.replace(UN_DEV, '').trim() : projectType;
    p.log.error(c.red(`${projectName} is not supported currently.`));
    process.exit(1);
  }
}

/**
 * 执行初始化流程
 * @param options CLI 选项
 */
export const run = async (options: CliRunOptions = {}): Promise<void> => {
  const argSkipPrompt = options.yes ?? false;

  // 检查是否存在现有的配置文件
  const existingConfig = await checkExistingConfig();
  if (existingConfig) {
    p.log.warn(c.yellow`${existingConfig} already exists. Please delete it and try again!`);
    process.exit(1);
  }

  // 初始化默认配置
  let result: PromptResult = { ...DEFAULT_CONFIG };

  // 获取被禁用的项目类型
  const disabledProjectTypes = getDisabledProjectTypes();

  // 如果不需要跳过提示，则进行交互式配置
  if (!argSkipPrompt) {
    try {
      result = await p.group({
        projectType: () => p.select<ProjectType>({
          message: 'Please select the project type:',
          options: PROJECT_TYPE.map(({ label, value }) => ({ label, value })),
        }),

        enableStylelint: ({ results }) => {
          // 验证项目类型是否可用
          if (results.projectType) {
            validateProjectType(results.projectType, disabledProjectTypes);
          }
          return p.confirm({
            message: 'Do you need stylelint?',
            initialValue: false,
          });
        },
        /*
         * enableMarkdownlint: () => p.confirm({
         *   message: '是否需要 markdownlint 配置？',
         *   initialValue: false,
         * }),
         */

        enableCommitlint: () => p.confirm({
          message: 'Do you need commitlint?',
          initialValue: true,
        }),
        enableExtraFormatter: () => p.confirm({
          message: 'Do you need extra formatter(prettier)?',
          initialValue: true,
        }),
        updateVscodeSetting: () => p.confirm({
          message: 'Do you need to update vscode settings?',
          initialValue: true,
        }),
      }, {
        onCancel: () => {
          p.cancel('Operation cancelled!');
          process.exit(0);
        },
      }) as PromptResult;
    } catch (error) {
      p.log.error(c.red`Failed to get user input: ${String(error)}`);
      throw error;
    }
  }

  // 执行文件更新操作
  try {
    await updateEslintFile(result);
    await updateStylelintFile(result);
    await updatePackageJsonFile(result);
    await updateVscodeSettingFile(result);
  } catch (error) {
    p.log.error(c.red`Failed to update configuration files: ${String(error)}`);
    throw error;
  }

  p.log.success(c.green`Operation completed!`);

  // 生成提示信息
  let message = `Now you can run ${c.blue('pnpm install')} to update dependencies!`;
  if (result.enableCommitlint) {
    message = `${message} And run ${c.blue('npx simple-git-hooks')} to initialize git hooks!`;
  }
  p.outro(message);
};
