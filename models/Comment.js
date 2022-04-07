import { Schema, model } from "mongoose";
const ChatSchema = Schema({
  autor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  text: {
    type: String,
    required: [true, "el texto del comentario es obligatorio."]
  },
  fecha: {
    type: Date,
    default: Date.now(),
    required: [true, "la fecha del comentario es obligatoria."]
  }
})

export default model("Comentario", ChatSchema)