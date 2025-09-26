import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',  // <-- ESM preset
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // <-- markera TS/TSX som ESM
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.app.json',
      useESM: true,  // <-- aktiverar ESM-stöd i ts-jest
    },
  },
};

export default config;
