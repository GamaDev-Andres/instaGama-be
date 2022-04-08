import { Schema, model } from "mongoose"

const HistorySchema = Schema({

  url: {
    type: String,
    required: true,
  },
  descripcion: String,

}, { expireAfterSeconds: 86400 })

export default model("Historia", HistorySchema)