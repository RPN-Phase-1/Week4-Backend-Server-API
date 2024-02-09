module.exports = {
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  restoreMocks: true,
  coveragePathIgnorePattern: ["node_modules", "src/config", "src/app.js", "tests"],
  coverageReporters: ["text", "lcov", "clover", "html"],
  setupFilesAfterEnv: ["./mocks.js"],
};