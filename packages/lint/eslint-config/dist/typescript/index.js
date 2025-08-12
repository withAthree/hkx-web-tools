import { eslint_config_default } from "../eslint-config-CV6O12vO.js";
import { typescript_default } from "../typescript-BzyvxM81.js";
import tseslint from "typescript-eslint";

//#region typescript/index.ts
var typescript_default$1 = [
	...eslint_config_default,
	...typescript_default,
	{
		name: "eslint-config/typescript/index",
		files: ["*.{ts,tsx}", "**/*.{ts,tsx}"],
		settings: {
			"import/parsers": { [tseslint.parser]: [
				".ts",
				".d.ts",
				".tsx"
			] },
			"import/resolver": { typescript: {} },
			"import/extensions": [
				".js",
				".ts",
				".mjs"
			]
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: {
					globalReturn: false,
					jsx: true
				},
				projectService: { allowDefaultProject: ["*.js"] }
			}
		}
	}
];

//#endregion
export { typescript_default$1 as default };