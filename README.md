# Tic-Tac-Toe Multiplayer (Full Stack)

This is a full-stack Tic-Tac-Toe game with real-time multiplayer support. Players can create and join games from different devices or browsers, and all state changes are synced live through websockets.

## Tech Stack

- Frontend: React, React Router, TypeScript, TailwindCSS
- Backend: Express (via Bun), Socket.IO
- Database: PostgreSQL with Drizzle ORM
- Deployment: Vercel (Frontend), Docker (Backend)
- Features: Live game syncing, REST API, UUID-based game IDs

## Getting Started

### Install dependencies
```
bun install
```

### Start development server
```
bun dev
```

### Start frontend (if separate)
```
npm run dev  # or use Vite
```
