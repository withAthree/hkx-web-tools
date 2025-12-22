import { execSync } from 'child_process';
// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';

// ==================== 文件操作工具函数 ====================

/**
 * Package.json 基础接口
 */
export interface PackageJsonBase {
  type?: 'module' | 'commonjs';
  [key: string]: unknown;
}

/**
 * 读取并解析 package.json 文件
 * @param cwd 工作目录，默认为当前工作目录
 * @returns 解析后的 package.json 对象
 * @throws 如果文件读取或解析失败则抛出错误
 */
export async function readPackageJson(cwd: string = process.cwd()): Promise<PackageJsonBase> {
  const packageJsonPath = path.join(cwd, 'package.json');
  try {
    const content = await fs.readFile(packageJsonPath, 'utf-8');
    return JSON.parse(content) as PackageJsonBase;
  } catch (error) {
    p.log.error(c.red`Failed to read or parse package.json: ${String(error)}`);
    throw error;
  }
}

/**
 * 安全地写入文件，包含错误处理
 * @param filePath 文件路径
 * @param content 文件内容
 * @param fileName 文件名（用于错误提示）
 * @param successMessage 成功消息（可选）
 */
export async function writeFileSafe(
  filePath: string,
  content: string,
  fileName: string,
  successMessage?: string,
): Promise<void> {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    if (successMessage) {
      p.log.success(c.green`${successMessage}`);
    } else {
      p.log.success(c.green`${fileName} created!`);
    }
  } catch (error) {
    p.log.error(c.red`Failed to write ${fileName}: ${String(error)}`);
    throw error;
  }
}

/**
 * 安全地读取文件，如果文件不存在返回空字符串
 * @param filePath 文件路径
 * @param warnMessage 警告消息（可选）
 * @returns 文件内容，如果文件不存在则返回空字符串
 */
export async function readFileSafe(
  filePath: string,
  warnMessage?: string,
): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    if (warnMessage) {
      p.log.warn(c.yellow`${warnMessage}`);
    }
    return '';
  }
}

/**
 * 安全地解析 JSON，支持容错处理
 * @param content JSON 字符串
 * @param defaultValue 解析失败时的默认值
 * @param errorMessage 错误消息（可选）
 * @returns 解析后的对象
 */
export function parseJsonSafe<T extends Record<string, unknown>>(
  content: string,
  defaultValue: T,
  errorMessage?: string,
): T {
  const trimmedContent = content.trim();
  if (!trimmedContent) {
    return defaultValue;
  }

  try {
    return JSON.parse(trimmedContent) as T;
  } catch {
    // 尝试修复常见的 JSON 格式问题（如缺少外层大括号）
    try {
      const cleanedContent = trimmedContent.replace(/\s*\}$/, '').trim();
      if (cleanedContent && cleanedContent !== '{') {
        return JSON.parse(`{${cleanedContent}}`) as T;
      }
    } catch {
      // 如果还是失败，返回默认值
    }

    if (errorMessage) {
      p.log.warn(c.yellow`${errorMessage}`);
    }
    return defaultValue;
  }
}

/**
 * 合并两个 JSON 对象，新对象的属性会覆盖旧对象
 * @param existing 现有对象
 * @param newData 新对象
 * @returns 合并后的对象
 */
export function mergeJson<T extends Record<string, unknown>>(
  existing: T,
  newData: Partial<T>,
): T {
  return {
    ...existing,
    ...newData,
  };
}

/**
 * 确保目录存在
 * @param dirPath 目录路径
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

/**
 * 确保文件存在（包括其目录）
 * @param filePath 文件路径
 */
export async function ensureFile(filePath: string): Promise<void> {
  await fs.ensureFile(filePath);
}

/**
 * 检查文件是否存在
 * @param filePath 文件路径
 * @returns 如果文件存在返回 true，否则返回 false
 */
export async function fileExists(filePath: string): Promise<boolean> {
  return fs.pathExists(filePath);
}

// ==================== 项目类型判断工具函数 ====================

/**
 * 判断是否为 Vue 项目
 * @param projectType 项目类型
 * @returns 如果是 Vue 项目返回 true，否则返回 false
 */
export function isVueProject(projectType: string): boolean {
  return projectType.includes('vue');
}

/**
 * 判断是否为 TypeScript 项目
 * @param projectType 项目类型
 * @returns 如果是 TypeScript 项目返回 true，否则返回 false
 */
export function isTypeScriptProject(projectType: string): boolean {
  return projectType.includes('typescript');
}

/**
 * 判断是否为 React 项目
 * @param projectType 项目类型
 * @returns 如果是 React 项目返回 true，否则返回 false
 */
export function isReactProject(projectType: string): boolean {
  return projectType.includes('react');
}

// ==================== 配置文件工具函数 ====================

/**
 * 获取配置文件扩展名
 * @param projectType 项目类型
 * @param packageType package.json 中的 type 字段
 * @returns 配置文件扩展名（不包含点号）
 */
export function getConfigFileExtension(
  projectType: string,
  packageType?: 'module' | 'commonjs',
): string {
  const baseExtension = isTypeScriptProject(projectType) ? 'ts' : 'js';
  return packageType === 'module' ? `m${baseExtension}` : baseExtension;
}

// ==================== ESLint 配置生成 ====================

/**
 * 生成 ESLint 配置文件内容
 * @param projectType 项目类型
 * @param ignores 忽略配置
 * @param extraFormatter 是否启用额外的格式化工具
 * @returns ESLint 配置文件内容
 */
export const getEslintConfigContent = (projectType: string, ignores: string | null, extraFormatter: boolean): string => `import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config${projectType.includes('index') ? '' : '/'}${projectType.replace('index', '')}'
${extraFormatter ? "import formatter from 'hkx-eslint-config/formatter';" : ''}

export default defineConfig([
  ...eslintConfig${ignores ? `,\n  { ${ignores} }` : ''}${extraFormatter ? ',\n  ...formatter' : ''}
])
`;

// ==================== 包版本管理 ====================

/**
 * 获取指定包的最新版本号
 * @param packageName 包名
 * @returns 返回包的版本号
 * @throws 如果包不存在或命令执行失败则抛出错误
 */
export const getPackageVersion = async (packageName: string): Promise<string> => {
  /**
   * 验证包名格式，防止命令注入
   * 支持标准 npm 包名格式：普通包名、scoped 包名（@scope/package）
   * 允许字符：字母、数字、连字符、下划线、点号、波浪号
   * scoped 包名格式：@scope/package-name
   */
  const validPackageNameRegex = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/i;

  if (!validPackageNameRegex.test(packageName)) {
    throw new Error(`Invalid package name: ${packageName}`);
  }

  try {
    const version = execSync(`pnpm view ${packageName} version`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();

    if (!version) {
      throw new Error(`Package ${packageName} not found`);
    }

    return version;
  } catch (error) {
    /**
     * 如果是我们自己抛出的错误（验证失败或包不存在），直接重新抛出
     */
    if (error instanceof Error && (error.message.includes('Invalid package name') || error.message.includes('not found'))) {
      throw error;
    }

    /**
     * 其他错误（如命令执行失败）
     */
    console.error(`[获取包版本] 错误: 无法获取 ${packageName} 的版本号`, error);
    throw new Error(`Failed to get version for package: ${packageName}`);
  }
};
