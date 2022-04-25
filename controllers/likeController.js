
import Post from '../models/Post.js';

export const handleLike = async (req, res) => {

  const { idPost } = req.body
  const { id } = req.usuario

  try {

    let post = await Post.findById(idPost)
    if (post.likes.includes(id)) {
      post.likes = post.likes.filter(el =>
        el.toString() !== id
      )
    } else {
      post.likes.push(id)

    }
    await post.save()
    post = await Post.findById(idPost).populate("autor", "foto name username").populate("likes", "foto name username")

    res.json({
      post: post.toObject()
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}