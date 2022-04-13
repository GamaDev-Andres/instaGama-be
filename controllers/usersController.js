import bcryptjs from 'bcryptjs'

import generarJWT from '../helpers/jwt.js';
import Usuario from "../models/User.js"

export const getUser = async (req, res = response) => {
  const { id } = req.params
  try {
    const usuario = await Usuario.findById(id).select("-inbox")

    res.json({
      usuario,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en la peticion",
    });
  }

}
export const createUser = async (req, res = response) => {
  const { email, password, name } = req.body
  try {
    const usuario = new Usuario({ email, password, name })

    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()
    const token = await generarJWT(usuario.id, usuario.name)
    res.json({
      usuario,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en la peticion",
    });
  }

}
export const followController = async (req, res = response) => {
  const { id } = req.params
  const { usuario } = req

  if (id === usuario.id) {
    return res.status(400).json({
      msg: "Un usuario no se puede seguir a él mismo."
    })
  }
  try {
    const userToFollow = await Usuario.findById(id)
    if (usuario.following.some(el => el.toString() === id)) {
      usuario.following = usuario.following.filter(idUser => idUser.toString() !== id)
      userToFollow.followers = usuario.followers.filter(idUser => idUser.toString() !== usuario.id)
    } else {
      usuario.following.push(id)
      userToFollow.followers.push(usuario.id)
    }


    await Promise.all([userToFollow.save(), usuario.save()])

    res.json({
      ok: true,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en la peticion",
    });
  }

}
export const getFollowers = async (req, res = response) => {
  const { id } = req.params

  try {
    const usuario = await Usuario.find({ _id: id }).populate({
      path: "followers",
      model: "Usuario",
      select: "name foto"
    }).select("followers")

    const followers = usuario[0].followers
    res.json({
      ok: true,
      followers
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en la peticion",
    });
  }

}
export const getFollowing = async (req, res = response) => {
  const { id } = req.params

  try {
    const usuario = await Usuario.find({ _id: id }).populate({
      path: "following",
      model: "Usuario",
      select: "name foto"
    }).select("following")

    const following = usuario[0].following
    res.json({
      ok: true,
      following
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en la peticion",
    });
  }

}