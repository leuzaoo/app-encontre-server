import "module-alias/register";
import "dotenv/config";
import { config } from "@/config";
import { SetupServer } from "@/server";

(async (): Promise<void> => {
  try {
    const server = new SetupServer(config.port);
    await server.setup();
    server.start();
  } catch (error) {
    console.error(`App exited with error: ${error}`);
  }
})();
