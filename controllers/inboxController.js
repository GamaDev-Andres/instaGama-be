import User from '../models/User.js';

export const sendMessage = async (req, res) => {

  const { uid } = req.params
  const { usuario } = req
  const { text } = req.body

  try {

    const userDestino = await User.findById(uid)
    const mensaje = {
      mensaje: text,
      autor: usuario.id
    }
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
    // userDestino.inbox
    await Promise.all([userDestino.save(), usuario.save()])
    res.json({
      ok: true
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
  const { usuario } = req

  try {

    const userDestino = await User.findById(uid)
    const mensaje = {
      mensaje: text,
      autor: usuario.id
    }
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
    // userDestino.inbox
    await Promise.all([userDestino.save(), usuario.save()])
    res.json({
      ok: true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en servidor"
    })
  }
}