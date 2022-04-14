import mongoose from "mongoose";
import crypto from "crypto"
import { populateUserNested } from '../helpers/db-services.js';

const UserSchema = mongoose.Schema({

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  }],
  inbox: [
    {

      with: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
      },
      mensajes: [
        {

          autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
          },
          mensaje: {
            type: String,
            required: true
          },
          fecha: {
            type: Date,
            default: Date.now(),
            required: true
          }

        }
      ]
    }
  ]

},
)

UserSchema.pre("findOne", function () {
  populateUserNested(this)
})
UserSchema.pre("findById", function () {
  populateUserNested(this)
})
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, email, ...usuario } = this.toObject();
  usuario.id = _id
  return usuario;
}

export default mongoose.model("Usuario", UserSchema);