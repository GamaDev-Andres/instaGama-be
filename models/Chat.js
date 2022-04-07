import { Schema, model } from "mongoose";
const ChatSchema = Schema({
  by: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  mensajes: [{
    mensaje: String,
    fecha: {
      type: Date,
      default: Date.now()
    }
  }]
})

export default model("Chat", ChatSchema)