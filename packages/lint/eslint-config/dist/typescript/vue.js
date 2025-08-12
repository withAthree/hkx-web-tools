import { eslint_config_default } from "../eslint-config-CV6O12vO.js";
import { vue_default } from "../vue-Cd7GiMyR.js";
import { typescript_default } from "../typescript-BzyvxM81.js";
import tseslint from "typescript-eslint";

//#region typescript/vue.ts
var vue_default$1 = [{
	name: "eslint-config/typescript/vue",
	extends: [
		eslint_config_default,
		typescript_default,
		vue_default
	],
	files: ["**/*.{ts,tsx,js,jsx,vue}"],
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parserOptions: {
			parser: {
				ts: tseslint.parser,
				tsx: tseslint.parser,
				js: "espree",
				jsx: "espree"
			},
			ecmaFeatures: { jsx: true }
		}
	}
}];

//#endregion
export { vue_default$1 as default };