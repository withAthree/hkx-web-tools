import { it } from 'vitest';
import path, {dirname} from 'node:path';
import {execSync} from "child_process";
import {fileURLToPath} from "node:url";


const filename = fileURLToPath(import.meta.url);
const rootDirname = dirname(filename);

it('cli test', async () => {
    const cliPath = path.join(rootDirname, '../dist/index.js');
});
