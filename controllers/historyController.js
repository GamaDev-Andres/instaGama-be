import History from '../models/History.js';

export const createHistory = async (req, res) => {

  const { url, descripcion } = req.body
  const { usuario } = req

  try {

    const historia = new History({ url, descripcion: descripcion || "" })
    usuario.histories.push(historia)

    await Promise.all([historia.save(), usuario.save()])
    res.json({
      ok: true,
      historia
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor"
    })
  }
}