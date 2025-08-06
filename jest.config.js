const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

const esModules = ["superjson", "langfuse"];

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  transformIgnorePatterns: [
    `/node_modules/(?!(${esModules.join("|")})/)`,
  ],
};
