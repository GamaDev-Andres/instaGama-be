// import jwt from "json"

// const generarJWT = (id, nombre) => {
//   const payload = { id, nombre }
//   return new Promise((resolve, reject) => {
//     jwt.sign(payload, process.env.FRASE_SECRETA, { expiresIn: 10800 }, (err, token) => {
//       if (err) {
//         console.log(err);
//         reject("Error generando token")
//       }
//       resolve(token)
//     })
//   })
// }

// export default generarJWT