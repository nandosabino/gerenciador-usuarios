export default {
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "12345",
  database: process.env.DB_NAME || "usersdb",
  port: process.env.DB_PORT || 5432,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: process.env.DATABASE_URL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  url: process.env.DATABASE_URL || null,
};
