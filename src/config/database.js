export default {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "12345",
  database: "usersdb",
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
