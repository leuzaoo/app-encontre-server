import type { Config } from "@jest/types";
import { resolve } from "path";
import rootConfig from "../jest.config";

const rootDir = resolve(__dirname, "..");

const config: Config.InitialOptions = {
  ...rootConfig,
  rootDir,
  displayName: "e2e-tests",
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
  testMatch: ["<rootDir>/test/**/*.test.ts"],
};

export default config;
