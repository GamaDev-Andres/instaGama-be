import User from '../models/User.js';
import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {

  const { uid } = req.params
  const { usuario } = req
  const { text } = req.body

  try {

    const remitente = await User.findById(usuario.id).select("inbox")
    const userDestino = await User.findById(uid).select("inbox")
    const mensaje = new Message({ mensaje: text, autor: usuario.id })

    if (remitente.inbox.some(el => el.with.toString() === uid)) {
      remitente.inbox = remitente.inbox.map(el => {

        if (el.with.toString() === uid) {

          el.mensajes.push(mensaje)

        }
        return el
      })

    } else {
      const chat = {
        with: uid,
        mensajes: [mensaje]
      }
      remitente.inbox.push(chat)
    }
    if (userDestino.inbox.some(el => el.with.toString() === remitente.id)) {
      userDestino.inbox = userDestino.inbox.map(el => {

        if (el.with.toString() === remitente.id) {

          el.mensajes.push(mensaje)

        }
        return el
      })
    } else {
      const chat = {
        with: remitente.id,
        mensajes: [mensaje]
      }
      userDestino.inbox.push(chat)
    }
    await Promise.all([userDestino.save(), remitente.save(), mensaje.save()])
    res.json({
      ok: true,
      mensaje
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en servidor"
    })
  }
}
//terminarlo
export const deleteMessage = async (req, res) => {

  const { mid } = req.params
  const { id } = req.usuario

  try {

    const mensaje = await Message.findByIdAndUpdate(mid, { mensaje: "El mensaje fue eliminado", mode: "off" })
    if (!mensaje) {
      return res.status(404).json({
        msg: "el mensaje que intenta eliminar no existe"
      })
    }
    if (mensaje.autor.toString() !== id) {
      return res.status(401).json({
        msg: "Este usuario no esta autorizado para eliminar este mensaje"
      })
    }
    await mensaje.save()
    res.json({
      ok: true,
      mensaje
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en servidor"
    })
  }
}
export const deleteChat = async (req, res) => {

  const { cid } = req.params
  const { usuario: usuarioReq } = req

  try {
    let usuario = await User.find({ _id: usuarioReq.id })
    usuario = usuario[0]
    if (!usuario.inbox.some(chat => chat._id.toString() === cid)) {
      return res.status(404).json({
        msg: "el chat que intenta eliminar no existe"
      })
    }
    usuario.inbox = usuario.inbox.filter(chat => chat._id.toString() !== cid)
    await usuario.save()

    res.json({
      ok: true,

    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en servidor"
    })
  }
}
export const getChats = async (req, res) => {

  const { usuario } = req

  try {

    const chats = await User.find({ _id: usuario.id }).populate({
      path: "inbox",
      populate: [
        {
          path: "with",
          model: "Usuario",
          select: "username name foto"
        },
        {
          path: "mensajes",
          model: "Mensaje",
        }
      ]
    }).select("inbox")
    res.json({
      ok: true,
      chats: chats.map(chat => chat.inbox).flat()
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en servidor"
    })
  }
}