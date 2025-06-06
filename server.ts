//e.g server.js
import express from "express";
import { getAllGames, createGame, makeMoveById, getGameById } from "./serverLogic/api"
import { Server } from "socket.io"
import cors from "cors"
import { Game } from "./src/gameLogic/game"

const app = express();
app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}))


// get all games
app.get("/api/game", async (req, res) => {
  try {
    const games = await getAllGames();
    //console.log(games)
    res.send(games)

  } catch(err) {
    console.log("error message:" , err)
  }
});

// get game by id
app.get("/api/game/:id", async (req, res) => {
  try {
    const gameId = req.params.id

    const game = await getGameById(gameId);
    //console.log(game)
    res.send(game)

  } catch(err) {
    console.log("error message:" , err)
  }
});

const makeRoomId = (game: Game) => `game-${game.id}`

// create new game with initial state
app.post("/api/game", async (req, res) => {
  const { prevGameId } = req.body
  const newGame = await createGame();

  if(prevGameId) {
    const oldRoomId = `game-${prevGameId}`
    io.to(oldRoomId).emit("new-game-created", newGame.id )
  }

  console.log("Created game:", newGame); // Debug here
  res.json(newGame)
});

//make move by id
app.post('/api/game/:id/move', async (req,res) => {
  try {
    const id = req.params.id 
    //console.log(req.body)
    const { row, col } = req.body
    const result = await makeMoveById(id, [row, col])
    io.to(makeRoomId(result)).emit("game-updated", result)
    console.log(result.currentPlayer, "SELECTED GRID", row, col)
    res.json(result)
  } catch (err){
    console.log(err.message)
    res.status(400).json({ error: err.message })

  }
})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server is listening on port-- http://localhost:${PORT}`));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
})

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);
  
  socket.on("join-game", async (gameId: string) => {
    const game = await getGameById(gameId)

    if(!game) {
      console.error(`Game ${gameId} not found`);
      return;
    }
    const roomId = makeRoomId(game);
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined ${roomId}`)
    io.to(roomId).emit("user-joined", socket.id)
  })
})
