import express from 'express'
import { Server } from 'socket.io'
import cors from "cors"
import http from "http"

import conectarDB from './config/db.js'
import routesUser from "./routes/users.js"
import routesAuth from "./routes/auth.js"
import routesPost from "./routes/post.js"
import routesComent from "./routes/coment.js"
import routesLike from "./routes/like.js"
import routesHistory from "./routes/history.js"
import routesInbox from "./routes/inbox.js"
import { socketController } from './sockets/controllers/controller.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })
conectarDB()

app.use(cors())
app.use(express.json({ extended: true }));

app.use("/api/auth", routesAuth);
app.use("/api/users", routesUser);
app.use("/api/post", routesPost);
app.use("/api/coment", routesComent);
app.use("/api/like", routesLike);
app.use("/api/history", routesHistory);
app.use("/api/inbox", routesInbox);

// server-side
io.on("connection", socketController);
const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log("servidor funcionando en puerto: " + PORT);
})