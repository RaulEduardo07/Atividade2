const mongoose = require("mongoose");

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI não foi definido no arquivo .env");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "gamesdb",
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
