import { cac } from "cac";
import * as p from "@clack/prompts";
import c from "ansis";
import path from "node:path";
import fs from "fs-extra";
import { fileURLToPath } from "node:url";
import parse from "parse-gitignore";
import { execSync } from "child_process";

//#region src/constants.ts
const dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(dirname, "../package.json"), "utf-8"));
const UN_DEV = "(未开发)";
/**
* 包名
*/
const PKG_NAME = pkg.name;
/**
* 包版本号
*/
const PKG_VERSION = pkg.version;
const PROJECT_TYPE = [
	{
		label: "Javascript",
		value: "index"
	},
	{
		label: "Typescript",
		value: "typescript"
	},
	{
		label: "Vue",
		value: "vue"
	},
	{
		label: "Vue + Typescript",
		value: "typescript/vue"
	},
	{
		label: "Node",
		value: "node"
	},
	{
		label: "Node + Typescript",
		value: "typescript/node"
	},
	{
		label: `React${UN_DEV}`,
		value: "react",
		disabled: true
	},
	{
		label: `React + Typescript${UN_DEV}`,
		value: "typescript/react",
		disabled: true
	}
];
const VERSION_MAP = {
	eslint: "^9.32.0",
	stylelint: "^16.23.0"
};
const VSCODE_SETTING_CONTENT = `
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "json5",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
`;

//#endregion
//#region src/utils.ts
const getEslintConfigContent = (projectType, ignores) => `import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config${projectType.includes("index") ? "" : "/"}${projectType.replace("index", "")}'

export default defineConfig([
  ...eslintConfig,${ignores ? `\n  { ${ignores} }` : ""}
])
`;
const getPackageVersion = async (packageName) => execSync(`pnpm view ${packageName} version`).toString("utf-8").trim();

//#endregion
//#region src/generate/updateEslintFile.ts
var updateEslintFile_default = async (result) => {
	const cwd = process.cwd();
	const { projectType } = result;
	const pathESLintIgnore = path.join(cwd, ".eslintignore");
	const pathPkgJson = path.join(cwd, "package.json");
	const pkgJsonContent = fs.readFileSync(pathPkgJson, "utf-8");
	const pkg$1 = JSON.parse(pkgJsonContent);
	let ext = projectType.includes("typescript") ? "ts" : "js";
	ext = pkg$1.type !== "module" ? `m${ext}` : ext;
	const configFileName = `eslint.config.${ext}`;
	const pathFlatConfig = path.join(cwd, configFileName);
	const eslintIgnores = [];
	if (fs.existsSync(pathESLintIgnore)) {
		p.log.step(c.cyan`迁移现有的 .eslintignore 文件！`);
		const content = await fs.readFileSync(pathESLintIgnore, "utf-8");
		const parsed = parse(content);
		const globs = parsed.globs();
		for (const glob of globs) if (glob.type === "ignore") eslintIgnores.push(...glob.patterns);
		else if (glob.type === "unignore") eslintIgnores.push(...glob.patterns.map((pattern) => `!${pattern}`));
	}
	let configLines = null;
	if (eslintIgnores.length) configLines = `ignores: ${JSON.stringify(eslintIgnores)},`;
	const eslintConfigContent = getEslintConfigContent(projectType, configLines);
	await fs.writeFile(pathFlatConfig, eslintConfigContent);
	p.log.success(c.green`${configFileName} 已创建！`);
	const files = fs.readdirSync(cwd);
	const legacyConfig = [];
	files.forEach((file) => {
		if (/eslint|prettier/.test(file) && !/eslint\.config\./.test(file)) legacyConfig.push(file);
	});
	if (legacyConfig.length) p.note(c.dim(legacyConfig.join(", ")), "你可以手动删除这些文件！");
};

//#endregion
//#region src/generate/updateMarkdownlintFile.ts
var updateMarkdownlintFile_default = async (result) => {
	/** TODO */
};

//#endregion
//#region src/generate/updateCommitlintFile.ts
var updateCommitlintFile_default = async (result) => {
	/** TODO */
};

//#endregion
//#region src/generate/updatePackageJsonFile.ts
var updatePackageJsonFile_default = async (result) => {
	const cwd = process.cwd();
	const pathPkgJson = path.join(cwd, "package.json");
	const pkgJsonContent = fs.readFileSync(pathPkgJson, "utf-8");
	const pkg$1 = JSON.parse(pkgJsonContent);
	pkg$1.devDependencies ??= {};
	pkg$1.devDependencies["hkx-eslint-config"] = `^${await getPackageVersion("hkx-eslint-config")}`;
	pkg$1.devDependencies.eslint ??= VERSION_MAP.eslint;
	pkg$1.scripts ??= {};
	pkg$1.scripts.lint = "eslint";
	pkg$1.scripts["lint:fix"] = "eslint --fix";
	if (result.enableStylelint) {
		pkg$1.devDependencies["hkx-stylelint-config"] = `^${await getPackageVersion("hkx-stylelint-config")}`;
		pkg$1.devDependencies.stylelint ??= VERSION_MAP.stylelint;
	}
	if (result.enableMarkdownlint) {}
	if (result.enableCommitlint) {}
	await fs.writeFileSync(pathPkgJson, JSON.stringify(pkg$1, null, 2));
	p.log.success(c.green`更改已写入 package.json ！`);
};

//#endregion
//#region src/generate/updateVscodeSettingFile.ts
var updateVscodeSettingFile_default = async (result) => {
	if (!result.updateVscodeSetting) return void 0;
	const cwd = process.cwd();
	const dotVscodePath = path.join(cwd, ".vscode");
	const settingsPath = path.join(dotVscodePath, "settings.json");
	fs.ensureFileSync(settingsPath);
	let vscodeSettingContent = fs.readFileSync(settingsPath, "utf-8");
	vscodeSettingContent = vscodeSettingContent.trim().replace(/\s*\}$/, "");
	vscodeSettingContent += vscodeSettingContent.endsWith(",") || vscodeSettingContent.endsWith("{") ? "" : ",";
	vscodeSettingContent += `${VSCODE_SETTING_CONTENT}}\n`;
	fs.writeFileSync(settingsPath, vscodeSettingContent, "utf-8");
	p.log.success(c.green`.vscode/settings.json 已更新！`);
};

//#endregion
//#region src/run.ts
const configFiles = [
	"eslint.config.js",
	"eslint.config.ts",
	"eslint.config.mjs",
	"eslint.config.mts"
];
const run = async (options = {}) => {
	const argSkipPrompt = options.yes;
	const existingConfig = configFiles.find((file) => fs.existsSync(path.join(process.cwd(), file)));
	if (existingConfig) {
		p.log.warn(c.yellow`${existingConfig} 已经存在，请删除后重试！`);
		return process.exit(1);
	}
	let result = {
		projectType: "index",
		enableStylelint: false,
		enableMarkdownlint: false,
		enableCommitlint: false,
		updateVscodeSetting: true
	};
	const disabledProjectType = PROJECT_TYPE.filter((item) => item.label.includes("未开发"));
	if (!argSkipPrompt) result = await p.group({
		projectType: () => p.select({
			message: "请选择项目类型：",
			options: PROJECT_TYPE.map(({ label, value }) => ({
				label,
				value
			}))
		}),
		enableStylelint: ({ results }) => {
			if (disabledProjectType.some((item) => item.value === results.projectType)) {
				p.log.error(c.red(`${PROJECT_TYPE.find((item) => item.value === results.projectType).label.replace(UN_DEV, "")} 目前暂不支持`));
				process.exit(1);
			}
			return p.confirm({
				message: "是否需要 stylelint 配置？",
				initialValue: false
			});
		},
		enableMarkdownlint: () => p.confirm({
			message: `是否启用 markdownlint？${UN_DEV}`,
			initialValue: false
		}),
		enableCommitlint: () => p.confirm({
			message: `是否启用 commitlint？${UN_DEV}`,
			initialValue: false
		}),
		updateVscodeSetting: () => p.confirm({
			message: "是否更新 vscode 设置？",
			initialValue: true
		})
	}, { onCancel: () => {
		p.cancel("操作已取消！");
		process.exit(0);
	} });
	await updateEslintFile_default(result);
	await updateMarkdownlintFile_default(result);
	await updateCommitlintFile_default(result);
	await updatePackageJsonFile_default(result);
	await updateVscodeSettingFile_default(result);
	p.log.success(c.green`操作完成！`);
	p.outro(`现在可以通过运行 ${c.blue("pnpm install")} 更新依赖！`);
};

//#endregion
//#region src/index.ts
const header = () => {
	console.log("\n");
	p.intro(`${c.green`hkx-eslint-config `}${c.dim`v${PKG_VERSION}`}`);
};
const cli = cac("hkx-eslint-config");
cli.command("", "运行初始化").option("--yes, -y", "跳过确认步骤使用默认设置", { default: false }).action(async (options) => {
	header();
	try {
		await run(options);
	} catch (error) {
		p.log.error(c.inverse.red(" 运行失败 "));
		p.log.error(c.red`✘ ${String(error)}`);
		process.exit(1);
	}
});
cli.help();
cli.version(PKG_VERSION);
cli.parse();

//#endregion
export {  };