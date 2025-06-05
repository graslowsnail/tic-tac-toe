// logic for the backend code
// this is like a CONTROLLER file that runs the actions to keep our routes clean
import {Game, initialGameState, CellIndex, makeMove, Board, Player} from "../src/gameLogic/game"
import {v4 as uuid } from "uuid"
import { db } from "../src/db/index"
import { gamesTable } from "../src/db/schema"
import { eq } from "drizzle-orm"

// temp storage for games in memory
export async function getAllGames (): Promise<Game[]> {
  const listOfGames = await db.select().from(gamesTable)
  return listOfGames.map(game => ({
    id: game.id,
    currentPlayer: game.currentPlayer,
    board: game.board,
    gameStatus: game.result ?? null,
  } as Game))
};

export async function createGame(): Promise<Game> {
  const id = uuid();
  const newGame = {...initialGameState(), id};

  await db.insert(gamesTable).values({
    id: newGame.id,
    currentPlayer: newGame.currentPlayer,
    board: newGame.board,
    result: newGame.gameStatus ?? null,
  })

  return newGame;

}

export async function makeMoveById(id: string, index: CellIndex): Promise<Game> {
  const gameInDb = await db.query.gamesTable.findFirst({
    where: eq(gamesTable.id, id),
  })

  if(!gameInDb) throw new Error("game not found bro");

  const updatedGame = makeMove(gameInDb as Game,index)

    await db
    .update(gamesTable)
    .set({
      board: updatedGame.board,
      currentPlayer: updatedGame.currentPlayer,
      result: updatedGame.gameStatus ?? null,
    })
    .where(eq(gamesTable.id, id))
    //gameStore.set(id,updatedGame)

  return updatedGame
} 


