// const config = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testPathIgnorePatterns: ['/node_modules/', '/dist/'],
//   setupFilesAfterEnv: ['./jest.setup.ts'],
//   globals: {
//     'ts-jest': {
//       tsconfig: 'tsconfig.json',
//     },
//   },
// };

// module.exports = config;

import type { Config } from "jest";
import nextJest from "next/jest";
import "@testing-library/jest-dom";

const createJestConfig = nextJest({
  // Path to your Next.js app
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
