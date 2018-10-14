const REQUIRED_COVERAGE = 80

function getCoverage(coverage) {
  return {
    branches: coverage,
    functions: coverage,
    lines: coverage,
    statements: coverage,
  }
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
    // global: getCoverage(REQUIRED_COVERAGE),
    './src/actions/': getCoverage(REQUIRED_COVERAGE),
    './src/views/': getCoverage(REQUIRED_COVERAGE),
    './src/state/': getCoverage(REQUIRED_COVERAGE),
    // './src/effects/': getCoverage(REQUIRED_COVERAGE),
  },
  verbose: true,
}
