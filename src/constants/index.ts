const isDev = import.meta.env.MODE === 'development'

export const SERVER_URL = isDev 
  ? 'http://localhost:3000' 
  : 'https://your-production-domain.com' // Replace with your actual domain 