module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "@app/(.*)$": "<rootDir>/src/$1"
  },
  setupTestFrameworkScriptFile: "<rootDir>/jest.setup.ts",
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/actions/**/*.{ts,tsx}",
    "<rootDir>/src/components/**/*.{ts,tsx}",
    "<rootDir>/src/reducers/**/*.{ts,tsx}"
  ],
  coverageReporters: ["json", "lcov"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  notify: true,
  notifyMode: "always",
  verbose: false,
  bail: true // stop tests after failure
};
