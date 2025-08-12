import { eslint_config_default } from "./eslint-config-CV6O12vO.js";
import { jsx_a11y_default, vue_default } from "./jsx-a11y-vI7yjRkI.js";

//#region vue.ts
var vue_default$1 = [{
	extends: [
		eslint_config_default,
		vue_default,
		jsx_a11y_default
	],
	files: ["**/*.{js,jsx,vue}"],
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parserOptions: {
			parser: "espree",
			ecmaFeatures: {
				globalReturn: false,
				impliedStrict: true,
				jsx: true
			}
		}
	}
}];

//#endregion
export { vue_default$1 as default };