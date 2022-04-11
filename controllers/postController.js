import { response } from 'express';

import Post from "../models/Post.js"
import Usuario from "../models/User.js"

export const createPost = async (req, res = response) => {

  const { url, descripcion } = req.body
  const { usuario: { id } } = req
  try {

    const post = new Post({ url, descripcion, autor: id })
    const user = await Usuario.findById(id)
    user.posts.push(post.id)
    await Promise.all([post.save(), user.save()])

    res.json({
      post
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}
export const deletePost = async (req, res = response) => {

  const { id } = req.params
  const { usuario } = req
  try {
    if (!usuario.posts.some(idObject => idObject._id.toString() === id)) {
      return res.status(404).json({
        msg: "Este usuario no tiene permitido eliminar este post."
      })
    }
    await Post.findByIdAndDelete(id)
    usuario.posts = usuario.posts.filter(post => post._id.toString() !== id)
    await usuario.save()
    res.json({
      ok: true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}
export const updatePost = async (req, res = response) => {

  const { id } = req.params
  const { usuario } = req
  const { descripcion } = req.body
  try {
    if (!usuario.posts.some(idObject => idObject._id.toString() === id)) {
      return res.status(404).json({
        msg: "Este usuario no tiene permitido actualizar este post."
      })
    }
    await Post.findByIdAndUpdate(id, { descripcion })
    res.json({
      ok: true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}