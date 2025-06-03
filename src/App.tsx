import { useState } from 'react'
import './App.css'
import { initialGameState, makeMove, type CellIndex } from './gameLogic/game'


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
        <div className="mb-1 text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([0,0])}> {game.board[0][0]}</div>
        <div className=" mb-1 text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([0,1])}> {game.board[0][1]}</div>
        <div className=" mb -1 text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([0,2])}> {game.board[0][2]}</div>

    </div>
    <div className='w-125 grid grid-cols-3'>
        <div className="mb-1 text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([1,0])}> {game.board[1][0]}</div>
        <div className=" mb-1 text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([1,1])}> {game.board[1][1]}</div>
        <div className="mb-1 text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([1,2])}> {game.board[1][2]}</div>

    </div>
    <div className='w-125 grid grid-cols-3'>
        <div className="text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([0,0])}> {game.board[2][0]}</div>
        <div className=" text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([0,1])}> {game.board[2][1]}</div>
        <div className=" text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={() => cellClick([2,2])}> {game.board[2][2]}</div>

    </div>
      {game.gameStatus && <div>PLAYER {game.gameStatus} WON
        <button onClick={()=> {setGame(initialGameState)}}>RESTART</button>
      </div>}
      <div>
      </div>
  </div>
)

}

export default App
