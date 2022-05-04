import { existePostPorId } from '../../helpers/db-validators.js'
import Comment from '../../models/Comment.js'

export const createComent = async ({ idPost, text, autor }, cb, socket) => {

  try {
    const post = await existePostPorId(idPost)
    if (!post) {
      return cb("no existe post", null)
    }
    if (!text) {
      return cb("se envio texto vacio", null)

    }
    let comentario = new Comment({ idPost, text, autor })
    post.coments.push(comentario.id)

    comentario = await Comment.populate(comentario, { path: "autor", select: "userName name foto" })
    await Promise.all([comentario.save(), post.save()])
    cb(false, comentario)
    socket.to(idPost).emit("newComent", comentario)
  } catch (error) {
    console.log(error);
  }

}