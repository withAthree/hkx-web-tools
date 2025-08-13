import { execSync } from 'child_process';

export const getEslintConfigContent = (projectType: string, ignores: string | null): string => `import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config${projectType.includes('index') ? '' : '/'}${projectType.replace('index', '')}'

export default defineConfig([
  ...eslintConfig,${ignores ? `\n  { ${ignores} }` : ''}
])
`;

export const getPackageVersion = async (packageName: string):Promise<string> => execSync(`pnpm view ${packageName} version`).toString('utf-8').trim();
