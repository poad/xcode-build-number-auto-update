module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/tests/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
  },
  modulePaths: [
    "<rootDir>/bin",
    "<rootDir>/dist",
    "<rootDir>/node_modules",
    "<rootDir>/node_modules/*"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  },
  verbose: true
}
