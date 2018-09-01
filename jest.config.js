const coverageForPureParts = {
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100
};

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
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    },
    "./src/actions/": coverageForPureParts,
    "./src/components/": coverageForPureParts,
    "./src/reducers/": coverageForPureParts
  }
};
