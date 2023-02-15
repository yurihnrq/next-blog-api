/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/__mocks__/',
    '<rootDir>/src/configs/',
    '<rootDir>/dist/'
  ],

  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.ts',
    '<rootDir>/src/providers/**/*.ts',
    '<rootDir>/src/middlewares/**/*.ts',
    '!<rootDir>/src/**/interfaces/*.ts'
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node'
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@mocks/(.*)': '<rootDir>/src/__mocks__/$1'
  },

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // A preset that is used as a base for Jest's configuration
  // preset: 'ts-jest',

  // Automatically reset mock state before every test
  resetMocks: false,

  // Automatically restore mock state and implementation before every test
  restoreMocks: true,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: './'

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-node',

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/__mocks__/',
    '<rootDir>/src/configs/',
    '<rootDir>/dist/'
  ],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  modulePathIgnorePatterns: ['<rootDir>/dist/'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  }
};

export default config;
