import { cac } from 'cac';
import * as p from '@clack/prompts';
import c from 'ansis';
import { PKG_VERSION } from './constants';

import { run } from './run';

const header = ():void => {
  console.log('\n');
  p.intro(`${c.green`hkx-eslint-config `}${c.dim`v${PKG_VERSION}`}`);
};

const cli = cac('hkx-eslint-config');

cli
  .command('', '运行初始化')
  .option('--yes, -y', '跳过确认步骤使用默认设置', { default: false })
  .action(async (options) => {
    header();
    try {
      await run(options);
    } catch (error) {
      p.log.error(c.inverse.red(' 运行失败 '));
      p.log.error(c.red`✘ ${String(error)}`);
      process.exit(1);
    }
  });

cli.help();
cli.version(PKG_VERSION);
cli.parse();
