const isDev = import.meta.env.MODE === 'development'

export const SERVER_URL = isDev 
  ? 'http://localhost:3000' 
  : 'https://tic-tac-toe-production-a8d0.up.railway.app'