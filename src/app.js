// src/app.js
const express = require("express");
const cors = require("cors");
const gamesRoutes = require("./routes/game.routes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(logger); // bônus: log de requisições

// Rotas
app.use("/games", gamesRoutes);

// Rota básica só pra teste
app.get("/", (req, res) => {
  res.json({ message: "API de Games 🎮 está rodando" });
});

// 404 para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware central de erro (sempre por último)
app.use(errorHandler);

module.exports = app;
