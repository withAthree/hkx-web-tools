import { cac } from 'cac';
import * as p from '@clack/prompts';
import c from 'ansis';
import { PKG_VERSION } from './constants';

import { run } from './run';

const header = ():void => {
  // eslint-disable-next-line no-console
  console.log('\n');
  p.intro(`${c.green`hkx-eslint-config `}${c.dim`v${PKG_VERSION}`}`);
};

const cli = cac('hkx-eslint-config');

cli
  .command('', 'Execute initialization')
  .option('--yes, -y', 'Skip the confirmation step and use the default settings.', { default: false })
  .action(async (options) => {
    header();
    try {
      await run(options);
    } catch (error) {
      p.log.error(c.inverse.red(' Initialization failed '));
      p.log.error(c.red`✘ ${String(error)}`);
      process.exit(1);
    }
  });

cli.help();
cli.version(PKG_VERSION);
cli.parse();
