import Message from '../../models/Message';

export const createMessage = async ({ uid, mensaje }, cb, usuario) => {

  try {

    const userDestino = await existeUsuarioPorId(uid)
    //comprobar que si no le envio token si pase , y que tome el catcch
    //de la fn existeUsuarioPorID
    // if (!userDestino) {
    //   return cb(userDestino)
    // }
    const mensajeDb = new Message({ mensaje, autor: usuario.id })
    if (usuario.inbox.some(el => el.with.toString() === uid)) {
      usuario.inbox = usuario.inbox.map(el => {

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
      usuario.inbox.push(chat)
    }
    if (userDestino.inbox.some(el => el.with.toString() === usuario.id)) {
      userDestino.inbox = userDestino.inbox.map(el => {

        if (el.with.toString() === usuario.id) {

          el.mensajes.push(mensajeDb)

        }
        return el
      })
    } else {
      const chat = {
        with: usuario.id,
        mensajes: [mensajeDb]
      }
      userDestino.inbox.push(chat)
    }
    await Promise.all([userDestino.save(), usuario.save(), mensajeDb.save()])

    socket.to(uid).emit("mensaje", mensajeDb)
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