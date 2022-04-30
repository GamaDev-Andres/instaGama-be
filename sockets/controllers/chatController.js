import { existeUsuarioPorId } from '../../helpers/db-validators.js';

export const createProvitionalChat = async (payload, cb) => {

  try {
    const userDestino = await existeUsuarioPorId(payload)
    if (!userDestino) {
      return cb("no existe userDestino", null)
    }
    const chat = {
      with: {
        foto: userDestino.foto,
        name: userDestino.name,
        id: payload
      },
      mensajes: []
    }
    cb(false, chat)
  } catch (error) {
    console.log(error);
  }

}