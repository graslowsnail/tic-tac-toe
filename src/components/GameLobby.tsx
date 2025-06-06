// view of a game 
import {Link, useLoaderData, useNavigate } from 'react-router'
import { type Game } from '../gameLogic/game'

function GameLobby () {
  let navigate = useNavigate();
  const { data } = useLoaderData<{data: Game[]}>()
  
  // Count wins
  const xWins = data.filter(game => game.gameStatus === 'x').length
  const oWins = data.filter(game => game.gameStatus === 'o').length
  const ties = data.filter(game => game.gameStatus === 'tie').length

  async function fetchInitialGameState() {
    try{
      const res = await fetch('http://localhost:3000/api/game', {
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
    <div className="mb-4">
      X Wins: {xWins} | O Wins: {oWins} | Ties: {ties}
    </div>
    <button className="mb-4" onClick={newGameHandler}>
      START A NEW GAME!
    </button>

    <div> game list view</div>
    <div className='flex flex-col'> 
      {data.map((game, i) => {
        return game.gameStatus === null ? (
        <Link key={i} className='border border-green-500 m-2' to={`/game/${game.id}`}> 
        Join Game room {i + 1 }
        </Link>
        ) : (
        <Link key={i} className='border m-2' to={`/game/${game.id}`}> 
        {game.id}
        </Link>
        )
      })}
    </div>
  </div>
  )
}

export default GameLobby;
