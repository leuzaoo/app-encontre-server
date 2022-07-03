export const config = {
  port: Number(process.env.PORT),
  database: {
    url: process.env.DATABASE_URL,
    ignoreSSL: process.env.IGNORE_SSL === "true",
  },
  auth: {
    secret: process.env.JWT_SECRET || "",
    salt: process.env.PWD_SALT,
  },
};
