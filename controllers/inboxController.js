import User from '../models/User.js';
import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {

  const { uid } = req.params
  const { usuario } = req
  const { text } = req.body

  try {

    const userDestino = await User.findById(uid)
    const mensaje = new Message({ mensaje: text, autor: usuario.id })

    if (usuario.inbox.some(el => el.with.toString() === uid)) {
      usuario.inbox = usuario.inbox.map(el => {

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
      usuario.inbox.push(chat)
    }
    if (userDestino.inbox.some(el => el.with.toString() === usuario.id)) {
      userDestino.inbox = userDestino.inbox.map(el => {

        if (el.with.toString() === usuario.id) {

          el.mensajes.push(mensaje)

        }
        return el
      })
    } else {
      const chat = {
        with: usuario.id,
        mensajes: [mensaje]
      }
      userDestino.inbox.push(chat)
    }
    await Promise.all([userDestino.save(), usuario.save(), mensaje.save()])
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
  const { usuario } = req

  try {

    if (!usuario.inbox.some(chat => chat._id === cid)) {
      return res.status(404).json({
        msg: "el chat que intenta eliminar no existe"
      })
    }
    usuario.inbox = usuario.inbox.filter(chat => chat._id !== cid)
    await usuario.save()

    res.json({
      ok: true,
      usuario
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en servidor"
    })
  }
}
// export const getMessagesOfChat = async (req, res) => {

//   const { cid } = req.params
//   const { usuario } = req

//   try {

//     const chat=usuario.inbox.find(chat=>chat._id===cid)
//     let mensajes=chat.mensajes
//    mensajes= await Promise.all(mensajes.map(mensaje=>Message.findById(mensaje)))
    
//     usuario.inbox = usuario.inbox.filter(chat => chat._id !== cid)
//     await usuario.save()

//     res.json({
//       ok: true,
//       usuario
//     })

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Error en servidor"
//     })
//   }
// }