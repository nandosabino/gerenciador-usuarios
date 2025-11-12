import dotenv from "dotenv";
dotenv.config();

const isProduction = !!process.env.DATABASE_URL;

export default {
  dialect: "postgres",
  ...(isProduction
    ? {
        url: process.env.DATABASE_URL,
        dialectOptions: {},
      }
    : {
        host: process.env.DB_HOST || "localhost",
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASS || "12345",
        database: process.env.DB_NAME || "usersdb",
        port: process.env.DB_PORT || 5432,
      }),
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
