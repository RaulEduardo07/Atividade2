import express from "express";
import cors from "cors";
import gamesRouter from "./routes/games.routes.js";

const app = express();
const PORT = 3000;

// Middlewares para JSON e CORS
app.use(cors());
app.use(express.json());

// Rotas de games
app.use("/games", gamesRouter);

app.get("/", (req, res) => {
  res.json({ message: "API de Games está no ar 🎮" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
