const esModules = ["superjson", "langfuse"];

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {},
  transformIgnorePatterns: [
    `/node_modules/(?!(${esModules.join("|")})/)`,
  ],
};
