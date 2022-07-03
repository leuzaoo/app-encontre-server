import path from "path";
import { addAliases } from "module-alias";

const rootPath = path.resolve(__dirname, "../..");

addAliases({
  "@": path.join(rootPath, "src"),
  "@test": path.join(rootPath, "src"),
});
