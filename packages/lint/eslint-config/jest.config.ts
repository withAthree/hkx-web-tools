const esModules = ["superjson", "langfuse"];

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  transform: {},
  transformIgnorePatterns: [
    `/node_modules/(?!(${esModules.join("|")})/)`,
  ],
  testMatch:[ "**/__tests__/**/*.test.[jt]s?(x)"]
};
