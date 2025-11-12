import express from "express";
import cors from "cors";
import User from "./models/User.js";
import Sequelize from "sequelize";
import config from "./config/database.js";
import userRoutes from "./routes.js";
import dotenv from "dotenv";

dotenv.config();

console.log("🚀 INICIANDO SERVIDOR...");
console.log("📦 Ambiente:", process.env.NODE_ENV || "development");

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

console.log("🔌 Conectando ao banco de dados...");
const sequelize = new Sequelize(config);

User.init(sequelize);

app.use("/usuarios", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: "OK",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      database: "disconnected",
      error: error.message,
    });
  }
});

const startServer = async () => {
  try {
    console.log("🔄 Autenticando com o banco...");
    await sequelize.authenticate();
    console.log("✅ Banco de dados Conectado!");

    console.log("🔄 Sincronizando modelos...");
    await sequelize.sync({ force: false });
    console.log("✅ Modelos sincronizados!");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🎉 Servidor ON na porta ${PORT}`);
      console.log(`🌐 Acesse: http://localhost:${PORT}`);
      console.log(`❤️  Health check: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar servidor:");
    console.error("Mensagem:", err.message);
    console.error("Stack:", err.stack);
    process.exit(1);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.error("❌ Erro não tratado:", err);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Exceção não capturada:", err);
  process.exit(1);
});
