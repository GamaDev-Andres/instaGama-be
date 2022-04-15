export const populateUserNested = function (that) {
  that.populate({
    path: "posts",
    model: "Post",
    populate: {
      path: "likes",
      model: "Usuario",
      select: "foto name"

    },
  }).populate({
    path: "inbox",
    populate: [
      {
        path: "with",
        model: "Usuario",
        select: "foto name",

      }
      , {
        path: "mensajes",
        model: "Mensaje",
        select: "-__v"
      }]
  })
}