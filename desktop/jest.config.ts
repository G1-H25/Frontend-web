import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // <- här pekar vi på vår setup-fil
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
      useESM: true
    }
  }
};

export default config;
