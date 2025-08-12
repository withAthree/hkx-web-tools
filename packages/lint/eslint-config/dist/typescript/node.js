import { eslint_config_default } from "../eslint-config-CV6O12vO.js";
import { node_default } from "../node-BCedUlu_.js";
import { typescript_default } from "../typescript-BzyvxM81.js";
import tseslint from "typescript-eslint";

//#region typescript/node.ts
var node_default$1 = [{
	name: "eslint-config/typescript/node",
	extends: [
		eslint_config_default,
		typescript_default,
		node_default
	],
	files: ["**/*.{ts,js}"],
	languageOptions: {
		parser: tseslint.parser,
		ecmaVersion: "latest",
		sourceType: "module"
	}
}];

//#endregion
export { node_default$1 as default };