
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComent = async (req, res) => {

  const { idPost, text } = req.body
  const { id } = req.usuario

  try {

    const comentario = new Comment({ idPost, text, autor: id })
    const post = await Post.findById(idPost)
    post.coments.push(comentario.id)
    await Promise.all([comentario.save(), post.save()])

    res.json({
      comentario
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}