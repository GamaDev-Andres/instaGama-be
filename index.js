import express from 'express'
import cors from "cors"

import conectarDB from './config/db.js'
import routesUser from "./routes/users.js"
import routesAuth from "./routes/auth.js"
import routesPost from "./routes/post.js"
const app = express()
conectarDB()
app.use(cors())
app.use(express.json({ extended: true }));

app.use("/api/auth", routesAuth);
app.use("/api/users", routesUser);
app.use("/api/post", routesPost);


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("servidor funcionando en puerto: " + PORT);
})