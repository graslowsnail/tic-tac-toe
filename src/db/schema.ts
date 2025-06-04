// db schema file
import { jsonb, pgTable, varchar } from "drizzle-orm/pg-core"
import type { Board } from "../../src/gameLogic/game"

export const gamesTable = pgTable("tic_tac_toe_games",{
  id: varchar({ length: 225 }).primaryKey(),
  currentPlayer: varchar({ length: 225 }).notNull(),
  board: jsonb().$type<Board>().notNull(),
  result: varchar({ length: 255 }),
});

