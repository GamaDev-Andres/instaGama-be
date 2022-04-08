
import Like from '../models/Like.js';

export const handleLike = async (req, res) => {

  const { idPost } = req.body
  const { id } = req.usuario

  try {

    let like = await Like.findOne({ idPost, autor: id })
    if (like) {
      await Like.deleteOne({
        idPost, autor: id
      })
      return res.json({
        msg: "like eliminado"
      })
    }
    like = new Like({ idPost, autor: id })
    await like.save()

    res.json({
      like
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error servidor"
    })
  }
}