import mongoose from "mongoose";
const ChatSchema = mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model("Chat", ChatSchema)