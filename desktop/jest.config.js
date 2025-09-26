/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',                        // Hanterar TypeScript automatiskt
  testEnvironment: 'jsdom',                 // Simulerar webbläsare för React-komponenter
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.(ts|tsx)'],        // Kör filer som slutar på .test.ts / .test.tsx
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], 
                                            // Laddar jest-dom matchers som toBeInTheDocument
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',            // Använder ditt projektets tsconfig
    },
  },
};
