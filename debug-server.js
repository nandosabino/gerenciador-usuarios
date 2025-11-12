import express from "express";
import cors from "cors";
import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("🔍 INICIANDO DEBUG...");
console.log("📦 Variáveis de ambiente carregadas:");
console.log(
  "- DATABASE_URL:",
  process.env.DATABASE_URL ? "*** CONFIGURADA ***" : "NÃO CONFIGURADA"
);
console.log("- DB_HOST:", process.env.DB_HOST || "não configurado");
console.log("- DB_USER:", process.env.DB_USER || "não configurado");
console.log("- DB_NAME:", process.env.DB_NAME || "não configurado");
console.log("- PORT:", process.env.PORT);
console.log("- NODE_ENV:", process.env.NODE_ENV);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando!",
    timestamp: new Date().toISOString(),
  });
});

async function testDatabase() {
  try {
    console.log("🔄 Tentando conectar ao banco...");

    let sequelize;

    if (process.env.DATABASE_URL) {
      sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: console.log,
      });
    } else {
      sequelize = new Sequelize({
        dialect: "postgres",
        host: process.env.DB_HOST || "localhost",
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASS || "12345",
        database: process.env.DB_NAME || "usersdb",
        port: process.env.DB_PORT || 5432,
        logging: console.log,
      });
    }

    await sequelize.authenticate();
    console.log("✅ BANCO DE DADOS CONECTADO COM SUCESSO!");

    return true;
  } catch (error) {
    console.error("❌ ERRO NA CONEXÃO COM BANCO:");
    console.error("Mensagem:", error.message);
    console.error("Código:", error.code);
    return false;
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);

  await testDatabase();
});
