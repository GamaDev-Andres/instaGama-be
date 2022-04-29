import { existeUsuarioPorId } from '../../helpers/db-validators.js';
import Message from '../../models/Message.js';

export const createMessage = async ({ uid, mensaje }, cb, usuario, socket) => {

  try {
    const [userDestino, userRemitente] = await Promise.all([existeUsuarioPorId(uid), existeUsuarioPorId(usuario.id)])
    // comprobar que si no le envio token si pase , y que tome el catcch
    // de la fn existeUsuarioPorID
    if (!userDestino) {
      return cb({ error: "no existe userDestino" }, null)
    }

    const mensajeDb = new Message({ mensaje, autor: userRemitente.id })
    if (userRemitente.inbox.some(el => el.with.toString() === uid)) {
      userRemitente.inbox = userRemitente.inbox.map(el => {

        if (el.with.toString() === uid) {

          el.mensajes.push(mensajeDb)

        }
        return el
      })

    } else {
      const chat = {
        with: uid,
        mensajes: [mensajeDb]
      }
      userRemitente.inbox.push(chat)
    }
    if (userDestino.inbox.some(el => el.with.toString() === userRemitente.id)) {
      userDestino.inbox = userDestino.inbox.map(el => {

        if (el.with.toString() === userRemitente.id) {

          el.mensajes.push(mensajeDb)

        }
        return el
      })
    } else {
      const chat = {
        with: userRemitente.id,
        mensajes: [mensajeDb]
      }
      userDestino.inbox.push(chat)
    }

    await Promise.all([userDestino.save(), userRemitente.save(), mensajeDb.save()])

    socket.to(uid).emit("mensaje", mensajeDb)
    cb(false, mensajeDb)

  } catch (error) {
    console.log(error);
  }

}
export const deleteMessage = async ({ mid }, cb, usuario) => {

  try {
    if (!mid) {
      throw new Error("el id del mensaje no se envio")
    }
    if (!mensaje) {
      throw new Error("el mensaje no se envio en el socket")

    }
    const mensaje = await Message.findByIdAndUpdate(mid, { mensaje: "El mensaje fue eliminado", mode: "off" })
    if (!mensaje) {
      return cb({
        msg: "el mensaje que intenta eliminar no existe"
      })
    }
    if (mensaje.autor.toString() !== id) {
      return cb({
        msg: "Este usuario no esta autorizado para eliminar este mensaje"
      })
    }
    await mensaje.save()
    cb("todo ssalio bien")
  } catch (error) {
    console.log(error);
    cb(error)
  }

}