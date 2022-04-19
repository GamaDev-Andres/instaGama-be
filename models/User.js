import mongoose from "mongoose";
import { populateUserNested } from '../helpers/db-services.js';

const UserSchema = mongoose.Schema({

  name: {
    type: String,
    required: [true, "el nombre del usuario es obligatorio."],

  },
  userName: {
    type: String,
    unique: true,
    required: [true, "el username es obligatorio"],
    minlength: [3, "username demasiado corto"],
    maxlength: [12, "username demasiado largo"],
    trim: true

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
          type: mongoose.Schema.Types.ObjectId,
          ref: "Mensaje"

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