export const populateUserNested = function (that) {
  that.populate({
    path: "posts",
    model: "Post",
    populate: [{
      path: "coments",
      model: "Comentario",
      select: "autor text",
      populate: {
        path: "autor",
        model: "Usuario",
        select: "name foto"
      }
    }, {
      path: "likes",
      model: "Usuario",
      select: "foto name"

    }],
  })
}