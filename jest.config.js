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
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  bail: true // stop tests after failure
};
