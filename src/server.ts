import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "@overnightjs/core";
import { connectDatabase } from "@/database";
import { LocationsController } from "@/controllers/locations";
import { UsersController } from "@/controllers/users";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async setup(): Promise<void> {
    this.setupServer();
    this.setupDatabase();
    this.setupControllers();
  }

  public setupServer(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  public setupControllers(): void {
    this.addControllers([new UsersController(), new LocationsController()]);
  }

  public async setupDatabase(): Promise<void> {
    try {
      await connectDatabase();
    } catch (error) {
      console.error("Could not connect to database: ", error);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info(`Server listening on port: ${this.port}`);
    });
  }
}
