import { response } from 'express';

import Post from "../models/Post.js"

export const createPost = async (req, res = response) => {

  const { url, descripcion } = req.body

  try {

    const post = new Post({ url, descripcion, autor: id })
    await post.save()

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