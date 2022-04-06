import express from 'express'
import cors from "cors"

import conectarDB from './config/db.js'
import routesUser from "./routes/users.js"
const app = express()
conectarDB()
app.use(cors())
app.use(express.json({ extended: true }));

app.use("/api/users", routesUser);


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("servidor funcionando en puerto: " + PORT);
})