// view of a game 
import { useLoaderData } from 'react-router'

function GameLobby () {
  const { data } = useLoaderData<{data: {id: string;}[]}>()
    console.log(data)
  return (
  <div>
    <div> game list view</div>
    <div> {data.map((containerObject, i )=> (
        <div key={i}>{containerObject.id}</div>
      ))}</div>
  </div>
  )
}

export default GameLobby;
