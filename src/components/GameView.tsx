// game view component
import { useState, useEffect } from 'react'
import { type CellIndex, type Game} from '../gameLogic/game'
import { useLoaderData, useNavigate }from 'react-router'

type GameBoxProps = {
  onClick: () => void
  game: string | null
}

function GridBox ({onClick, game}: GameBoxProps) {
  return (
        <div className="mb-1 text-7xl content-center w-40 h-40 mr-1 bg-white dark:bg-gray-500 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5" onClick={onClick}> {game}</div>
 )
}

function GameView() {
  let navigate = useNavigate();
  const { data } = useLoaderData<{data: Game}>()
  const [game, setGame] = useState(data)
  
  //sync the game state to the loader state
  useEffect(() => {
    console.log(data, "############# USE EFFECT DATA")
    setGame(data)
  }, [data])

  async function fetchInitialGameState() {
    try{
      const res = await fetch('/api/game', {method: "POST"})
      const newGame= await res.json()
      //console.log(data)
      //setGame(data)
      navigate(`/game/${newGame.id}`)
    } catch(error) {
        console.log(error)
    }
  }


  const cellClick = async (index:CellIndex ) => {
      const row = index[0]
      const col = index[1]

      const res = await fetch(`/api/game/${game.id}/move`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({row: row, col: col})
      })

      const data = await res.json()
      setGame(data)
    }
    
    const onResetHandler = () => {
      fetchInitialGameState()
    }

  return(
    <div>
        <button onClick={() => navigate('/')} className="mb-4 px-4 py-2 border">Back to Lobby</button>
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
          <div className='text-green-400 text-3xl'>
            {game.gameStatus === "tie" ? "IT'S A TIE!" : `PLAYER ${game.gameStatus.toUpperCase()} WON`}
            <div className='text-5xl mt-5 text-red-400 border border-white cursor-pointer' onClick={onResetHandler}>RESTART</div>
          </div>
        }
        <div>
        </div>
    </div>
  )
}

export default GameView
