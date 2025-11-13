import { Router } from "express";

const router = Router();

// "Banco de dados" em memória (para testes)
let games = [];
let nextId = 1;

// GET /games -> lista todos
router.get("/", (req, res) => {
  res.json(games);
});

// GET /games/:id -> busca por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const game = games.find(g => g.id === id);

  if (!game) {
    return res.status(404).json({ error: "Game não encontrado" });
  }

  res.json(game);
});

// POST /games -> cria novo game
router.post("/", (req, res) => {
  const {
    titulo,
    genero,
    plataforma,
    anoLancamento,
    desenvolvedora,
    nota,
    preco
  } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: "Campo 'titulo' é obrigatório" });
  }

  const novoGame = {
    id: nextId++,
    titulo,
    genero: genero || null,
    plataforma: plataforma || null,
    anoLancamento: anoLancamento || null,
    desenvolvedora: desenvolvedora || null,
    nota: nota || null,
    preco: preco || null
  };

  games.push(novoGame);
  res.status(201).json(novoGame);
});

// PUT /games/:id -> atualiza todos os campos
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = games.findIndex(g => g.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Game não encontrado" });
  }

  const {
    titulo,
    genero,
    plataforma,
    anoLancamento,
    desenvolvedora,
    nota,
    preco
  } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: "Campo 'titulo' é obrigatório" });
  }

  const gameAtualizado = {
    id,
    titulo,
    genero: genero || null,
    plataforma: plataforma || null,
    anoLancamento: anoLancamento || null,
    desenvolvedora: desenvolvedora || null,
    nota: nota || null,
    preco: preco || null
  };

  games[index] = gameAtualizado;
  res.json(gameAtualizado);
});

// PATCH /games/:id -> atualiza parcialmente
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const game = games.find(g => g.id === id);

  if (!game) {
    return res.status(404).json({ error: "Game não encontrado" });
  }

  const campos = [
    "titulo",
    "genero",
    "plataforma",
    "anoLancamento",
    "desenvolvedora",
    "nota",
    "preco"
  ];

  campos.forEach(campo => {
    if (req.body[campo] !== undefined) {
      game[campo] = req.body[campo];
    }
  });

  res.json(game);
});

// DELETE /games/:id -> remove game
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = games.findIndex(g => g.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Game não encontrado" });
  }

  games.splice(index, 1);
  res.status(204).send(); // Sem conteúdo
});

export default router;
