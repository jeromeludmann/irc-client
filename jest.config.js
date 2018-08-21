module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "@app/(.*)$": "<rootDir>/src/$1",
  },
  setupTestFrameworkScriptFile: "<rootDir>/jest.setup.ts",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  notify: true,
};
