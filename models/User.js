import { Schema, model } from "mongoose";

const UserSchema = Schema({

  name: {
    type: String,
    required: [true, "el nombre del usuario es obligatorio."],

  },

  email: {
    type: String,
    required: [true, "el email del usuario es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "el password del usuario es obligatorio"],
  },
  foto: {
    type: String,
    default: "https://res.cloudinary.com/dapa84kxy/image/upload/v1649317047/InstaGama/kisspng-user-profile-get-em-cardiovascular-disease-zingah-avatar-5ab7520468bc16.870439461521963524429_iy5c3i.jpg"

  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
  inbox: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chat"
    }
  ],
  historias: [
    {
      type: Schema.Types.ObjectId,
      ref: "Historia"
    }
  ]

},
)

export default model("Usuario", UserSchema);