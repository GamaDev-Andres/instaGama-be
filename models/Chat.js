import mongoose from "mongoose";
const ChatSchema = mongoose.Schema({
  person1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  person2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  mensajes: [{
    mensaje: {
      type: String,
      required: [true, "mensaje en el chat obligatorio"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    fecha: {
      type: Date,
      default: Date.now()
    }
  }]
})

export default mongoose.model("Chat", ChatSchema)