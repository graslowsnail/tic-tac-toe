import { useState } from 'react'
import './App.css'
import { initialGameState, makeMove, type CellIndex } from './gameLogic/game'

type GameBoxProps = {
  onClick: () => void 
  game: string | null
}

function GridBox ({onClick, game}: GameBoxProps) {
  return (
        <div className="mb-1 text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-500 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={onClick}> {game}</div>
  )
}


function App() {
  const [game, setGame] = useState(initialGameState)

  const cellClick = (index:CellIndex ) => {
    if(game.gameStatus) return
      setGame(prev => makeMove(prev,index))
  }

  return (
  <div>
      <div className='text-5xl mb-2'>Tik Tac Toe</div>
    <div className='w-125 grid grid-cols-3'>
        <GridBox onClick={() => cellClick([0, 0])} game={game.board[0][0]} />
        <GridBox onClick={() => cellClick([0, 1])} game={game.board[0][1]} />
        <GridBox onClick={() => cellClick([0, 2])} game={game.board[0][2]} />
    </div>
    <div className='w-125 grid grid-cols-3'>
        <GridBox onClick={() => cellClick([1, 0])} game={game.board[1][0]} />
        <GridBox onClick={() => cellClick([1, 1])} game={game.board[1][1]} />
        <GridBox onClick={() => cellClick([1, 2])} game={game.board[1][2]} />

    </div>
    <div className='w-125 grid grid-cols-3'>
        <GridBox onClick={() => cellClick([2, 0])} game={game.board[2][0]} />
        <GridBox onClick={() => cellClick([2, 1])} game={game.board[2][1]} />
        <GridBox onClick={() => cellClick([2, 2])} game={game.board[2][2]} />
    </div>
      <div className='text-5xl mb-2'>
          current player: {game.currentPlayer}
      </div>
      {game.gameStatus && 
        <div className='text-green-400 text-3xl'>PLAYER {game.gameStatus} WON

          <div className='text-5xl mt-5 text-red-400 border border-white' onClick={()=> {setGame(initialGameState)}}>RESTART</div>

        </div>
      }
      <div>
      </div>
  </div>
)

}

export default App
