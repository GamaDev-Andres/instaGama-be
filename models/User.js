import mongoose from "mongoose";

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
},
)


UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.id = _id
  return usuario;
}

export default mongoose.model("Usuario", UserSchema);