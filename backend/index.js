const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();
colors.enable();

const Anim = require("./database/anim.model");
const connect = require("./database/connect");

const app = express();

// Get port from environment variable or use 8000 as fallback
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Add a health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  console.log("Hello World!".rainbow);
  res.send("Hello World!");
});

app.get("/api/anime", async (req, res) => {
  try {
    const anime = await Anim.find();
    res.json(anime);
  } catch (error) {
    console.error("Error fetching anime:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/anime", async (req, res) => {
  try {
    const anime = new Anim(req.body);
    await anime.save();
    res.json(anime);
  } catch (error) {
    console.error("Error creating anime:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Connect to database first, then start server
const startServer = async () => {
  try {
    await connect();
    console.log("Successfully connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
