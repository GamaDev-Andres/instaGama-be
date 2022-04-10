import mongoose from 'mongoose';

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
  coments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comentario"
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  }]


}, { timestamps: true })

PostSchema.methods.toJSON = function () {
  const { __v, _id, ...post } = this.toObject();
  post.id = _id
  return post;

}
export default mongoose.model("Post", PostSchema)