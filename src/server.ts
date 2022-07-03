import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import { LocationsController } from "@/controllers/locations";

export class SetupServer extends Server {
  constructor(private PORT = 3000) {
    super();
  }

  public setup(): void {
    this.setupServer();
    this.setupControllers();
  }

  public setupServer(): void {
    this.app.use(bodyParser.json());
  }

  public setupControllers(): void {
    this.addControllers([new LocationsController()]);
  }
}
