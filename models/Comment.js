import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  idPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  text: {
    type: String,
    required: [true, "el texto del comentario es obligatorio."]
  },

}, { timestamps: true })

CommentSchema.methods.toJSON = function () {
  const { __v, _id, ...comment } = this.toObject();
  comment.id = _id
  return comment;

}
export default mongoose.model("Comentario", CommentSchema)