module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['./jest.test.setup.js'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  transformIgnorePatterns: [
    // Ignore react native in transformations, since this release has some TS inside a JS file,
    //  which causes an error when running tests.
    'node_modules/react-native$',
    '@sentry/.*',
    'sentry-expo',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
