
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
export const deleteComent = async (req, res) => {

  const { idComent } = req.params
  const { id } = req.usuario

  try {

    const comentario = await Comment.findById(idComent)
    if (!comentario) {
      return res.status(404).json({
        msg: "El comentario que intenta eliminar no existe"
      })
    }
    if (id !== comentario.autor.toString()) {
      return res.status(400).json({
        msg: "Este usuario no tiene permitido eliminar este comentario."
      })
    }
    const post = await Post.findById(comentario.idPost)
    post.coments = post.coments.filter(coment => coment !== idComent)

    await Promise.all([Comment.findByIdAndDelete(idComent), post.save()])

    res.json({
      ok: true,
      post
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}
export const updateComent = async (req, res) => {

  const { idComent } = req.params
  const { id } = req.usuario
  const { text } = req.body

  try {

    const comentario = await Comment.findById(idComent)
    if (!comentario) {
      return res.status(404).json({
        msg: "El comentario que intenta actualizar no existe"
      })
    }
    if (id !== comentario.autor.toString()) {
      return res.status(400).json({
        msg: "Este usuario no tiene permitido actualizar este comentario."
      })
    }
    await Comment.findByIdAndUpdate(idComent, { text })

    res.json({
      ok: true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}
export const getComentsOfPost = async (req, res) => {

  const { idPost } = req.params

  try {

    const post = await Post.findById(idPost).populate({
      path: "coments",
      model: "Comentario",
      populate: {
        path: "autor",
        model: "Usuario",
        select: "foto name userName "
      }
    }).populate("autor", "userName name foto")
    if (!post) {
      return res.status(404).json({
        msg: "El post del que quiere los comentarios, no existe"
      })
    }

    const comentarios = post.coments
    res.json({
      ok: true,
      autor: post.autor,
      descripcion: post.descripcion,
      comentarios,
      fecha: post.createdAt
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}