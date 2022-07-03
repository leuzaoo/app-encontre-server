export const config = {
  port: Number(process.env.PORT),
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  },
  auth: {
    secret: process.env.JWT_SECRET || "",
    salt: process.env.PWD_SALT,
  },
};
