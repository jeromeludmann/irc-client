const coverageForPureParts = {
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100,
}

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/$1',
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.ts',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageThreshold: {
    './src/actions/': coverageForPureParts,
    './src/views/': coverageForPureParts,
    './src/state/': coverageForPureParts,
  },
  verbose: true,
}
