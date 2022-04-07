import { Schema, model } from "mongoose";
const PostSchema = Schema({
  url: {
    type: String,
  },
  descripcion: String,
  autor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "el autor del post es obligatorio."]
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comentario"
  }
  ],
  fecha: {
    type: Date,
    default: Date.now(),
    required: [true, "la fecha del post es obligatoria."]
  }

})

export default model("Post", PostSchema)