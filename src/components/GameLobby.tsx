// view of a game 
import {Link, useLoaderData, useNavigate } from 'react-router'
import { type Game } from '../gameLogic/game'
import { SERVER_URL } from '../constants'

function GameLobby () {
  let navigate = useNavigate();
  const { data } = useLoaderData<{data: Game[]}>()
  
  // Count wins
  const xWins = data.filter(game => game.gameStatus === 'x').length
  const oWins = data.filter(game => game.gameStatus === 'o').length
  const ties = data.filter(game => game.gameStatus === 'tie').length

  async function fetchInitialGameState() {
    try{
      const res = await fetch(`${SERVER_URL}/api/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      })

      const newGame= await res.json()
      navigate(`/game/${newGame.id}`)
    } catch(error) {
        console.log(error)
    }
  }
  const newGameHandler = () => {
    fetchInitialGameState();
  }

  return (
  <div>
    {/* Simple Scoreboard */}
    <div className="mb-4 text-5xl">
      X Wins: {xWins} | O Wins: {oWins} | Ties: {ties}
    </div>
    <button className="mb-4 bg-green-600 font-bold" onClick={newGameHandler}>
      START A NEW GAME!
    </button>
    <div className='flex flex-col items-center'> 
      {data.map((game, i) => {
        return game.gameStatus === null ? (
        <Link key={i} className='border border-blue-600 rounded-lg m-2 w-48 h-12 flex items-center justify-center' to={`/game/${game.id}`}> 
        <span className='text-white text-lg '> Join Game room {i + 1 }</span>
        </Link>
        ) : (
        <Link key={i} className='border border-red-500 rounded-lg m-2 w-48 h-12 flex items-center justify-center' to={`/game/${game.id}`}> 
        <span className='text-white'> Join Game room {i + 1 }</span>
        </Link>
        )
      })}
    </div>
  </div>
  )
}

export default GameLobby;
