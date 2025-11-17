// src/routes/game.routes.js
const express = require("express");
const {
  createGame,
  listGames,
  getGameById,
  updateGame,
  patchGame,
  deleteGame
} = require("../controllers/game.controller");

const router = express.Router();

router.get("/", listGames);           // GET /games
router.get("/:id", getGameById);      // GET /games/:id
router.post("/", createGame);         // POST /games
router.put("/:id", updateGame);       // PUT /games/:id
router.patch("/:id", patchGame);      // PATCH /games/:id
router.delete("/:id", deleteGame);    // DELETE /games/:id

module.exports = router;
