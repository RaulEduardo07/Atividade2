// src/models/game.model.js
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "O campo 'titulo' é obrigatório"]
    },
    genero: {
      type: String,
      required: [true, "O campo 'genero' é obrigatório"]
    },
    plataforma: {
      type: String,
      required: [true, "O campo 'plataforma' é obrigatório"]
    },
    lancamento: {
      type: Number,
      required: [true, "O campo 'lancamento' é obrigatório"]
    }
  },
  {
    timestamps: true
  }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
