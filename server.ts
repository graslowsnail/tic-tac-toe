//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import {createGame, makeMoveById} from "./serverLogic/api"

const app = express();
app.use(express.json())

const port = 3000;

app.post("/api/game", (req, res) => {
  const game = createGame();
  res.json(game)
});

app.post('/api/game/:id/move',(req,res) => {
  try {
    const id = req.params.id 
    console.log(req.body)
    const { row, col } = req.body
    const result = makeMoveById(id, [row, col])
    res.json(result)
  } catch (err){
    console.log(err.message)
    res.status(400).json({ error: err.message })

  }
})

ViteExpress.listen(app, port, () => console.log(`Server is listening on port      http://localhost:${port}`));
