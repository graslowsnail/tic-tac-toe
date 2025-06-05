// view of a game 
import {Link, useLoaderData } from 'react-router'

function GameLobby () {
  const { data } = useLoaderData<{data: {id: string;}[]}>()
    console.log(data)


  return (
  <div>
    <div> game list view</div>
    <div className='flex flex-col'> {data.map((containerObject, i )=> (
        <Link className='border m-2' to={`game/${containerObject.id}`} > {containerObject.id}</Link>
      ))}</div>
  </div>
  )
}

export default GameLobby;
