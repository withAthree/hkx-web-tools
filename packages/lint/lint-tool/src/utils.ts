import { execSync } from 'child_process';

export const getEslintConfigContent = (projectType: string, ignores: string | null, extraFormatter: boolean): string => `import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config${projectType.includes('index') ? '' : '/'}${projectType.replace('index', '')}'
${extraFormatter ? "import formatter from 'hkx-eslint-config/formatter';" : ''}

export default defineConfig([
  ...eslintConfig${ignores ? `,\n  { ${ignores} }` : ''}${extraFormatter ? ',\n  ...formatter' : ''}
])
`;

export const getPackageVersion = async (packageName: string):Promise<string> => execSync(`pnpm view ${packageName} version`).toString('utf-8').trim();
