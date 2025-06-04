// game logic for tic tac toe

export type Player = "x" | "o"
export type Cell = Player | null
export type Row = [Cell, Cell, Cell]
export type Board = [Row , Row, Row]
export type CellIndex= [0 | 1 | 2, 0 | 1 | 2]
export type GameStatus = "x" | "o" | "tie" | null

export type Game = {
  id: string,
  board: Board,
  currentPlayer: Player,
  gameStatus? : GameStatus,
}

export const initialGameState = (): Game => {
  return {
    id: '',
    currentPlayer: "o",
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
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

const isWinner = (board: Board, player: Player): boolean => {
  for (const combo of winningCombos) {
    const [[r1, c1], [r2, c2], [r3, c3]] = combo;

    if (
      board[r1][c1] === player &&
      board[r2][c2] === player &&
      board[r3][c3] === player
    ) {
      return true;
    }
  }
  return false;
}

export const getGameStatus = (board:Board):GameStatus => {
  if(isWinner(board, "x")) return "x"
  if(isWinner(board, "o")) return "o"

  // check for tie
  const boardIsFull = board.every(row => row.every(cell => cell !== null));
  if (boardIsFull) return "tie";
  return null; // game still in progress
}



export const makeMove = (game:Game,position: CellIndex) => {
  const [row, col ] = position
  if(game.board[row] [col] != null ) {
    console.log('invalid move, position already taken')
    return game
  }

  const currentGame = structuredClone(game)
  currentGame.board[row] [col] = game.currentPlayer
  currentGame.currentPlayer = currentGame.currentPlayer === 'x' ? 'o' : 'x'
  currentGame.gameStatus = getGameStatus(currentGame.board)

  return currentGame

};
