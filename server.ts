//e.g server.js
import express from "express";
import ViteExpress from "vite-express";

const app = express();
const port = 3000;

app.get("/hello", (_, res) => res.send("Hello from express!"));

ViteExpress.listen(app, port, () => console.log(`Server is listening on port      http://localhost:${port}`));
