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
})

export default mongoose.model("Like", LikeSchema)