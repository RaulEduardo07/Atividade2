// src/controllers/game.controller.js
const mongoose = require("mongoose");
const Game = require("../models/game.model");

// Criar novo game
async function createGame(req, res, next) {
  try {
    const { titulo, genero, plataforma, lancamento } = req.body;

    const novoGame = await Game.create({
      titulo,
      genero,
      plataforma,
      lancamento
    });

    return res.status(201).json(novoGame);
  } catch (error) {
    next(error); // manda pro middleware de erro
  }
}

// Listar todos os games
async function listGames(req, res, next) {
  try {
    const games = await Game.find();
    return res.json(games);
  } catch (error) {
    next(error);
  }
}

// Buscar game por ID
async function getGameById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({ message: "Game não encontrado" });
    }

    return res.json(game);
  } catch (error) {
    next(error);
  }
}

// Atualizar game (PUT – substitui tudo)
async function updateGame(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const { titulo, genero, plataforma, lancamento } = req.body;

    const gameAtualizado = await Game.findByIdAndUpdate(
      id,
      { titulo, genero, plataforma, lancamento },
      { new: true, runValidators: true } // retorna atualizado e valida
    );

    if (!gameAtualizado) {
      return res.status(404).json({ message: "Game não encontrado" });
    }

    return res.json(gameAtualizado);
  } catch (error) {
    next(error);
  }
}

// Atualização parcial (PATCH)
async function patchGame(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const dados = req.body;

    const gameAtualizado = await Game.findByIdAndUpdate(id, dados, {
      new: true,
      runValidators: true
    });

    if (!gameAtualizado) {
      return res.status(404).json({ message: "Game não encontrado" });
    }

    return res.json(gameAtualizado);
  } catch (error) {
    next(error);
  }
}

// Deletar game
async function deleteGame(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const gameRemovido = await Game.findByIdAndDelete(id);

    if (!gameRemovido) {
      return res.status(404).json({ message: "Game não encontrado" });
    }

    return res.status(204).send(); // sem conteúdo
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createGame,
  listGames,
  getGameById,
  updateGame,
  patchGame,
  deleteGame
};
