import express from 'express'
import cors from "cors"

import conectarDB from './config/db.js'
import routesUser from "./routes/users.js"
import routesAuth from "./routes/auth.js"
import routesPost from "./routes/post.js"
import routesComent from "./routes/coment.js"
import routesLike from "./routes/like.js"

const app = express()
conectarDB()

app.use(cors())
app.use(express.json({ extended: true }));

app.use("/api/auth", routesAuth);
app.use("/api/users", routesUser);
app.use("/api/post", routesPost);
app.use("/api/coment", routesComent);
app.use("/api/like", routesLike);


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("servidor funcionando en puerto: " + PORT);
})