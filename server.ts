//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { getAllGames, createGame, makeMoveById } from "./serverLogic/api"

const app = express();
app.use(express.json())

const port = 3000;

app.get("/api/game", async (req, res) => {
  try {
    const games = await getAllGames();
    console.log(games)
    res.send(games)

  } catch(err) {
    console.log("error message:" , err)
  }
});

app.post("/api/game", async (req, res) => {
  const game = await createGame();
  console.log("Created game:", game); // Debug here
  res.json(game)
});

app.post('/api/game/:id/move', async (req,res) => {
  try {
    const id = req.params.id 
    console.log(req.body)
    const { row, col } = req.body
    const result = await makeMoveById(id, [row, col])
    console.log(result)
    res.json(result)
  } catch (err){
    console.log(err.message)
    res.status(400).json({ error: err.message })

  }
})

ViteExpress.listen(app, port, () => console.log(`Server is listening on port      http://localhost:${port}`));
