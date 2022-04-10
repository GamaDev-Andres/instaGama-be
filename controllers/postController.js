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