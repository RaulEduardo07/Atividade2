// src/server.js
require("dotenv").config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);       // TEM QUE SER A PRIMEIRA COISA

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
