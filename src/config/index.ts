export const config = {
  client: process.env.APP_URL,
  port: Number(process.env.PORT),
  database: {
    url: process.env.DATABASE_URL,
    useSSL: process.env.USE_SSL === "true",
  },
  auth: {
    secret: process.env.JWT_SECRET || "",
    salt: Number(process.env.PWD_SALT),
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
};
