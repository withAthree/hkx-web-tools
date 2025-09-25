// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';

import { CliRunOptions, ProjectType, PromptResult } from './types';

// UN_DEV
import { PROJECT_TYPE, UN_DEV } from './constants';
import updateEslintFile from './generate/updateEslintFile';
import updatePackageJsonFile from './generate/updatePackageJsonFile';
import updateVscodeSettingFile from './generate/updateVscodeSettingFile';
import updateStylelintFile from './generate/updateStylelintFile';

const configFiles = ['eslint.config.js', 'eslint.config.ts', 'eslint.config.mjs', 'eslint.config.mts'];

export const run = async (options: CliRunOptions = {}): Promise<void> => {
  const argSkipPrompt = options.yes;

  const existingConfig = configFiles.find((file) => fs.existsSync(path.join(process.cwd(), file)));

  if (existingConfig) {
    p.log.warn(c.yellow`${existingConfig} already exists. Please delete it and try again!`);
    return process.exit(1);
  }

  let result: PromptResult = {
    projectType: 'index',
    enableStylelint: false,
    enableMarkdownlint: false,
    enableCommitlint: false,
    updateVscodeSetting: true,
  };

  const disabledProjectType = PROJECT_TYPE.filter((item) => item.label.includes('Under development'));

  if (!argSkipPrompt) {
    result = await p.group({
      projectType: () => p.select<ProjectType>({
        message: 'Please select the project type:',
        options: PROJECT_TYPE.map(({ label, value }) => ({ label, value })),
      }),

      enableStylelint: ({ results }) => {
        if (disabledProjectType.some((item) => item.value === results.projectType)) {
          p.log.error(c.red(`${PROJECT_TYPE.find((item) => item.value === results.projectType)!
            .label.replace(UN_DEV, '')} is not supported currently.`));
          process.exit(1);
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
        initialValue: false,
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
  }

  await updateEslintFile(result);
  await updateStylelintFile(result);
  await updatePackageJsonFile(result);
  await updateVscodeSettingFile(result);

  p.log.success(c.green`Operation completed!`);

  let msg = `Now you can run ${c.blue('pnpm install')} to update dependencies!`;
  if (result.enableCommitlint) {
    msg = `${msg} And run ${c.blue('npx simple-git-hooks')} to initialize git hooks!`;
  }
  p.outro(msg);
};
