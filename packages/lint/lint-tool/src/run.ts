// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';

import { CliRunOptions, ProjectType, PromptResult } from './types';
import { PROJECT_TYPE, UN_DEV } from './constants';
import updateEslintFile from './generate/updateEslintFile';
import updateMarkdownlintFile from './generate/updateMarkdownlintFile';
import updateCommitlintFile from './generate/updateCommitlintFile';
import updatePackageJsonFile from './generate/updatePackageJsonFile';
import updateVscodeSettingFile from './generate/updateVscodeSettingFile';

const configFiles = ['eslint.config.js', 'eslint.config.ts', 'eslint.config.mjs', 'eslint.config.mts'];

export const run = async (options: CliRunOptions = {}): Promise<void> => {
  const argSkipPrompt = options.yes;

  const existingConfig = configFiles.find((file) => fs.existsSync(path.join(process.cwd(), file)));

  if (existingConfig) {
    p.log.warn(c.yellow`${existingConfig} 已经存在，请删除后重试！`);
    return process.exit(1);
  }

  let result: PromptResult = {
    projectType: 'index',
    enableStylelint: false,
    enableMarkdownlint: false,
    enableCommitlint: false,
    updateVscodeSetting: true,
  };

  const disabledProjectType = PROJECT_TYPE.filter((item) => item.label.includes('未开发'));

  if (!argSkipPrompt) {
    result = await p.group({
      projectType: () => p.select<ProjectType>({
        message: '请选择项目类型：',
        options: PROJECT_TYPE.map(({ label, value }) => ({ label, value })),
      }),
      enableStylelint: ({ results }) => {
        if (disabledProjectType.some((item) => item.value === results.projectType)) {
          p.log.error(c.red(`${PROJECT_TYPE.find((item) => item.value === results.projectType)!.label.replace(UN_DEV, '')} 目前暂不支持`));
          process.exit(1);
        }
        return p.confirm({
          message: '是否需要 stylelint 配置？',
          initialValue: false,
        });
      },
      enableMarkdownlint: () => p.confirm({
        message: `是否启用 markdownlint？${UN_DEV}`,
        initialValue: false,
      }),
      enableCommitlint: () => p.confirm({
        message: `是否启用 commitlint？${UN_DEV}`,
        initialValue: false,
      }),
      updateVscodeSetting: () => p.confirm({
        message: '是否更新 vscode 设置？',
        initialValue: true,
      }),
    }, {
      onCancel: () => {
        p.cancel('操作已取消！');
        process.exit(0);
      },
    }) as PromptResult;
  }

  await updateEslintFile(result);
  await updateMarkdownlintFile(result);
  await updateCommitlintFile(result);
  await updatePackageJsonFile(result);
  await updateVscodeSettingFile(result);

  p.log.success(c.green`操作完成！`);
  p.outro(`现在可以通过运行 ${c.blue('pnpm install')} 更新依赖！`);
};
