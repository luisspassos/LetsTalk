module.exports = {
  testPathIgnorePatterns: ['/node_modules/', './next/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ["babel-jest", { presets: ["next/babel"] }],
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
    '!src/**/*_app.tsx',
    '!src/**/*_document.tsx',
  ],
  coverageReporters: ['lcov', 'json'],
};
