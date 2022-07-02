import type { Config } from "@jest/types";
import { resolve } from "path";

const rootDir = resolve(__dirname);

const globalConfig: Config.InitialOptions = {
  rootDir,
  displayName: "root-tests",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  testEnvironment: "node",
  clearMocks: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/test/$1",
  },
};

export default globalConfig;
