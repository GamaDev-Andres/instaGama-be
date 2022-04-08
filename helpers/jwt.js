import jwt from "jsonwebtoken"

const generarJWT = (id, name) => {
  const payload = { id, name }
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.FRASE_SECRETA, { expiresIn: 10800 }, (err, token) => {
      if (err) {
        console.log(err);
        reject("Error generando token")
      }
      resolve(token)
    })
  })
}

export default generarJWT