import mongoose from 'mongoose';

const LikeSchema = mongoose.Schema({
  idPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
}, { timestamps: true })
LikeSchema.methods.toJSON = function () {
  const { __v, _id, ...like } = this.toObject();
  like.id = _id
  return like;

}
export default mongoose.model("Like", LikeSchema)