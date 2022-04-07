import { Schema, model } from "mongoose"

const HistorySchema = Schema({

  url: {
    type: String,
    required: true,
  },
  descripcion: String,

}, { expireAfterSeconds: 60 * 60 * 24 })

export default model("Historia", HistorySchema)