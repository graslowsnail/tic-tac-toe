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
    <div className='row'>
        <button onClick={() => cellClick([0,0])}> {game.board[0][0]}</button>
        <button onClick={() => cellClick([0,1])}> {game.board[0][1]}</button>
        <button onClick={() => cellClick([0,2])}> {game.board[0][2]}</button>

    </div>
    <div className='row'>
        <button onClick={() => cellClick([1,0])}> {game.board[1][0]}</button>
        <button onClick={() => cellClick([1,1])}> {game.board[1][1]}</button>
        <button onClick={() => cellClick([1,2])}> {game.board[1][2]}</button>

    </div>
    <div className='row'>
        <button onClick={() => cellClick([2,0])}> {game.board[2][0]}</button>
        <button onClick={() => cellClick([2,1])}> {game.board[2][1]}</button>
        <button onClick={() => cellClick([2,2])}> {game.board[2][2]}</button>

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
