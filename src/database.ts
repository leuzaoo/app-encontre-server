import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/entities/user";
import { Admin } from "@/entities/admin";
import { config } from "@/config";

export function connectDatabase(): Promise<DataSource> {
  const database = new DataSource({
    url: config.database.url,
    type: "postgres",
    synchronize: true,
    entities: [User, Admin],
    ...(config.database.useSSL && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  });

  return database.initialize();
}
