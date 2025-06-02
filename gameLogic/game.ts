// game logic for tic tac toe

export type Player = "x" | "o"
export type Cell = Player | null
export type Row = [Cell, Cell, Cell]
export type Board = [Row , Row, Row]
export type CellIndex= [0 | 1 | 2, 0 | 1 | 2]
export type GameStatus = "x" | "o" | "tie" | null

type Game = {
  board: Board,
  currentPlayer: Player,
  gameStatus : GameStatus,
}

export const initialGameState = (): Game => {
  return {
    currentPlayer: "o",
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ], 
    gameStatus: null
  }
}

const winningCombos :  CellIndex [] [] = [
  // Rows
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Columns
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonals
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
]


export const makeMove = (game:Game,position: CellIndex) => {
  const [row, col ] = position
  if(game.board[row] [col] != null ) {
    console.log('invalid move, position already taken')
    return game
  }

  const currentGame = structuredClone(game)
  currentGame.board[row] [col] = game.currentPlayer
  currentGame.currentPlayer = currentGame.currentPlayer === 'x' ? 'o' : 'x'
};
