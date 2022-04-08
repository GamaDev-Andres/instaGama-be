import mongoose from 'mongoose';
import Comentario from "../models/Comment.js"

const PostSchema = mongoose.Schema({
  url: {
    type: String,
  },
  descripcion: { type: String, default: "" },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "el autor del post es obligatorio."]
  },


}, { timestamps: true })

PostSchema.methods.toJSON = function () {
  const { __v, _id, ...post } = this.toObject();
  post.id = _id
  return post;

}
export default mongoose.model("Post", PostSchema)