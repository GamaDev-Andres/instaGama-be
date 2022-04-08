import Usuario from "../models/User.js"
import Post from '../models/Post.js';
export const emailExiste = async (email = '') => {

  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
}

export const existeUsuarioPorId = async (id) => {

  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
}
export const existePostPorId = async (idPost) => {
  const existePostPorId = await Post.findById(idPost);
  if (!existePostPorId) {
    throw new Error(`El id no existe ${idPost}`);
  }
}