import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import Like from '../models/Like.js'

export const getPostsUser = async (id) => {
  try {
    let posts = await Post.find({ autor: id })
    let coments = await Promise.all(posts.map(post => getComents(post.id)))
    let likesDb = await Promise.all(posts.map(post => getLikes(post.id)))
    posts = posts.map(post => {
      const comentarios = coments.find(el => el[post.id]) || []
      const likes = likesDb.find(el => el[post.id]) || []

      return { ...post.toJSON(), comentarios: comentarios[post.id], likes: likes[post.id] }
    })
    return posts
  } catch (error) {
    console.log(error);

  }

}
export const getComents = async (id) => {
  try {
    const coments = await Comment.find({ idPost: id })
    return { [id]: coments }

  } catch (error) {
    console.log(error);

  }
}
export const getLikes = async (id) => {
  try {
    const likes = await Like.find({ idPost: id })
    return { [id]: likes }

  } catch (error) {
    console.log(error);

  }
}