
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
    // if (like) {
    //   await Like.deleteOne({
    //     idPost, autor: id
    //   })
    //   return res.json({
    //     msg: "like eliminado"
    //   })
    // }
    // like = new Like({ idPost, autor: id })
    // await like.save()

    res.json({
      post
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}