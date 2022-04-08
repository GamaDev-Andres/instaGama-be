import Usuario from "../models/User.js"
export const validarUser = async (req, res, next) => {
  const { usuario: { id } } = req
  try {

    if (!id) {
      return res.status(404).json({
        msg: "Error - se intenta validar usuario, sin enviarlo en la request"
      })
    }
    const user = await Usuario.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "Error-el usuario no existe"
      })
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

