
import { Socket } from 'socket.io';
import { comprobarJWT } from '../../helpers/comprobarJWT.js';
import { createProvitionalChat } from './chatController.js';
import { createMessage, deleteMessage } from './mensajeController.js';

export const socketController = async (socket = new Socket()) => {
  console.log("connect");
  const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
  if (!usuario) {
    return socket.disconnect()
  }
  console.log("si token valido");
  socket.join(usuario.id)
  //contemplar idea de responderle algo al usuario que envia el mensaje
  // y asi que los mensajes coincidan en el tiempo (con el cb)
  socket.on("mensaje", (payload, cb) => createMessage(payload, cb, usuario, socket))
  socket.on("deleteMensaje", (payload, cb) => deleteMessage(payload, cb, usuario))
  socket.on("newChat", (payload, cb) => createProvitionalChat(payload, cb))
}