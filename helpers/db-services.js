export const populateUserNested = function (that) {
  that.populate({
    path: "posts",
    model: "Post",
    populate: [{
      path: "autor",
      model: "Usuario",
      select: "name foto userName"
    }, {
      path: "likes",
      model: "Usuario",
      select: "foto name userName"

    }],
  }).populate({
    path: "inbox",
    populate: [
      {
        path: "with",
        model: "Usuario",
        select: "foto name userName",

      }
      , {
        path: "mensajes",
        model: "Mensaje",
        select: "-__v"
      }]
  })
}