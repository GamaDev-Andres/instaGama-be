import { response } from 'express';

import Post from "../models/Post.js"
import Usuario from "../models/User.js"
import Comment from '../models/Comment.js';

export const createPost = async (req, res = response) => {

  const { url, descripcion } = req.body
  const { id } = req.usuario

  try {
    const autor = await Usuario.findById(id);

    if (!autor) {
      return res.status(404).json({
        msg: "Error-el usuario no existe"
      })
    }
    const post = new Post({ url, descripcion, autor: id })
    await post.save()
    // const comentarios = await Comment.find({ idPost: post.id })
    // const likes = await Like.find({ idPost: post.id })

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