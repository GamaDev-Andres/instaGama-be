
import { Socket } from 'socket.io';
import { comprobarJWT } from '../../helpers/comprobarJWT.js';
import { createProvitionalChat } from './chatController.js';
import { createComent } from './comentController.js';
import { createMessage, deleteMessage } from './mensajeController.js';

export const socketController = async (socket = new Socket()) => {
  console.log("connect");
  const createMessageListenner = (payload, cb) => createMessage(payload, cb, socket)
  const deleteMessageListenner = (payload, cb) => deleteMessage(payload, cb, socket)
  const createProvitionalChatListenner = (payload, cb) => createProvitionalChat(payload, cb)
  const createComentListenner = (payload, cb) => createComent(payload, cb, socket)
  socket.on("logout", (id) => {

    socket.off("mensaje", createMessageListenner)
    socket.off("deleteMensaje", deleteMessageListenner)
    socket.off("newChat", createProvitionalChatListenner)
    socket.off("newComent", createComentListenner)

    socket.leave(id)
  })
  socket.on("validado", async ({ token, id }) => {
    const usuario = await comprobarJWT(token);
    if (!usuario) {
      console.log("user no validado con jwt");
      return
    }
    socket.join(id)

    socket.on("mensaje", createMessageListenner)
    socket.on("deleteMensaje", deleteMessageListenner)
    socket.on("newChat", createProvitionalChatListenner)
    socket.on("newComent", createComentListenner)
  })
  socket.on("openRoomComent", (idPost) => {
    socket.join(idPost)
  })
  socket.on("leaveRoomComent", (idPost) => {
    socket.leave(idPost)
  })
}