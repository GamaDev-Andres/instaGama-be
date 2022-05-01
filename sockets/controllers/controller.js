
import { Socket } from 'socket.io';
import { comprobarJWT } from '../../helpers/comprobarJWT.js';
import { createProvitionalChat } from './chatController.js';
import { createMessage, deleteMessage } from './mensajeController.js';

export const socketController = async (socket = new Socket()) => {
  console.log("connect");
  const createMessageListenner = (payload, cb) => createMessage(payload, cb, socket)
  const deleteMessageListenner = (payload, cb) => deleteMessage(payload, cb)
  const createProvitionalChatListenner = (payload, cb) => createProvitionalChat(payload, cb)
  socket.on("logout", () => {

    console.log("logout");
    //contemplar idea de responderle algo al usuario que envia el mensaje
    // y asi que los mensajes coincidan en el tiempo (con el cb)
    // socket.use()
    socket.off("mensaje", createMessageListenner)
    socket.off("deleteMensaje", deleteMessageListenner)
    socket.off("newChat", createProvitionalChatListenner)
    // socket.off
  })
  socket.on("validado", async ({ token, id }) => {
    const usuario = await comprobarJWT(token);
    if (!usuario) {
      console.log("user no validado con jwt");
      return
    }
    console.log("validado");
    socket.join(id)
    //contemplar idea de responderle algo al usuario que envia el mensaje
    // y asi que los mensajes coincidan en el tiempo (con el cb)
    // socket.use()
    socket.on("mensaje", createMessageListenner)
    socket.on("deleteMensaje", deleteMessageListenner)
    socket.on("newChat", createProvitionalChatListenner)
    // socket.off
  })
}