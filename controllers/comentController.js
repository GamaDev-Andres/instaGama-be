
import Comment from '../models/Comment.js';

export const createComent = async (req, res) => {

  const { idPost, text } = req.body
  const { id } = req.usuario

  try {

    const comentario = new Comment({ idPost, text, autor: id })
    await comentario.save()

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