// game view component
import { useState, useEffect } from 'react'
import type { CellIndex, Game} from '../gameLogic/game'
import { useLoaderData, useNavigate }from 'react-router'
import { io } from "socket.io-client"

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
  // whenever my loader gets new data from navigation, SYNC that with my React State
  useEffect(() => {
    setGame(data)
  }, [data])
  //sync the game state to the loader state

  useEffect(() => {
    const socket = io("http://localhost:3000")
    socket.on("connect", () => {
      console.log("connected to socket")
    })
    // JOIN current game
    socket.emit("join-game", data.id)

    socket.on("user-joined", (userId: string) => {
      console.log(`user ${userId} joined`)
    })

    socket.on("game-updated", (game: Game) => {
      // console.log("game updated", game)
      setGame(game)
    })
    
    //Listen for when a new game is created
    socket.on("new-game-created", (newGameId: string) => {
      navigate(`/game/${newGameId}`)
    })

    return () => {
      socket.disconnect();
    }
  }, [data])

  async function fetchInitialGameState() {
    try{
      const res = await fetch('http://localhost:3000/api/game', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({prevGameId: game.id}),
      })

      const newGame= await res.json()
      console.log(newGame, "########## restart game data")
      navigate(`/game/${newGame.id}`)
    } catch(error) {
        console.log(error)
    }
  }


  const cellClick = async (index:CellIndex ) => {
      const row = index[0]
      const col = index[1]

      const res = await fetch(`http://localhost:3000/api/game/${game.id}/move`, {
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
    <div >
      <div className='flex flex-col items-center'>
        <div className='border border-blue-600 rounded-lg m-2 w-48 h-12 flex items-center justify-center cursor-pointer' onClick={() => navigate('/')}> 
          <span className='text-white text-lg'>Back to Lobby</span>
        </div>
        <div className='text-5xl mb-2'>Tic Tac Toe</div>
      </div>
      <div className='text-5xl mb-2'>
         {game.currentPlayer.toUpperCase()}'s  turn
      </div>
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
        {game.gameStatus && 
          <div className='text-green-400 text-3xl'>
            {game.gameStatus === "tie" ? "IT'S A TIE!" : `PLAYER ${game.gameStatus.toUpperCase()} WON`}
            <div className='text-5xl mt-5 text-red-400 border border-white rounded-xl cursor-pointer' onClick={onResetHandler}>rematch</div>
          </div>
        }
        <div>
        </div>
    </div>
  )
}

export default GameView
