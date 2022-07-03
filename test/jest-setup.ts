import supertest from "supertest";
import { SetupServer } from "@/server";

beforeAll(() => {
  const server = new SetupServer();
  server.setup();
  global.testServer = supertest(server.app);
});
