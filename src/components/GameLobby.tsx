// view of a game 
import {Link, useLoaderData } from 'react-router'
import { type Game } from '../gameLogic/game'

function GameLobby () {
  const { data } = useLoaderData<{data: Game[]}>()
  
  // Count wins
  const xWins = data.filter(game => game.gameStatus === 'x').length
  const oWins = data.filter(game => game.gameStatus === 'o').length
  const ties = data.filter(game => game.gameStatus === 'tie').length

  return (
  <div>
    {/* Simple Scoreboard */}
    <div className="mb-4">
      X Wins: {xWins} | O Wins: {oWins} | Ties: {ties}
    </div>

    <div> game list view</div>
    <div className='flex flex-col'> 
      {data.map((game, i) => (
        <Link key={i} className='border m-2' to={`/game/${game.id}`}> 
          {game.id}
        </Link>
      ))}
    </div>
  </div>
  )
}

export default GameLobby;
