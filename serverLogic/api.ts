// logic for the backend code
import {Game, initialGameState, CellIndex, makeMove} from "../src/gameLogic/game"
import {v4 as uuid } from "uuid"

// temp storage for games in memory
const gameStore = new Map<string, Game>()

export function createGame(): Game {
  const id = uuid();
  const newGame = {...initialGameState(), id}
  gameStore.set(id, newGame)
  
  return newGame;
}

export function makeMoveById(id: string, index: CellIndex):Game {
  const game = gameStore.get(id)
    if(!game) {
      throw new Error ("game not found bro")
    } 
  const updatedGame = makeMove(game, index)
  gameStore.set(id,updatedGame)

  return updatedGame;
}


