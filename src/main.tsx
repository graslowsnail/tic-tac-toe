import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import GameLobby from './components/GameLobby.tsx'
import GameView from  './components/GameView.tsx'
import { createBrowserRouter, RouterProvider } from "react-router"


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: GameLobby,
        loader: async () => {
          try{
            const res = await fetch('/api/game', {method: "GET"})
            const data = await res.json()
            //console.log(data)
           return { data }
      
          } catch(error) {
              console.log(error)
          }
        }
        
      },
      {
        path: "/game/:gameId",
        Component: GameView,
      },
    ],
  },
])


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

/*
      {
        path: "/",
        Component: GameLobby,
        loader: ,// API CALL FOR GAME LIST
      },
*/
