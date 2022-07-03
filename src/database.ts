import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/entities/user";
import { config } from "@/config";

export function connectDatabase(): Promise<DataSource> {
  const database = new DataSource({
    type: "postgres",
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    synchronize: true,
    entities: [User],
  });

  return database.initialize();
}
