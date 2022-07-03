import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/entities/user";
import { config } from "@/config";

export function connectDatabase(): Promise<DataSource> {
  const database = new DataSource({
    url: config.database.url,
    type: "postgres",
    synchronize: true,
    entities: [User],
    ...(config.database.useSSL && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  });

  return database.initialize();
}
