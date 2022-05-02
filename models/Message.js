import mongoose from "mongoose";
const MessageSchema = mongoose.Schema({
  mode: {
    type: String,
    enum: ["off", "on"],
    default: "on"
  },
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
    default: Date.now
  }

})

export default mongoose.model("Mensaje", MessageSchema)