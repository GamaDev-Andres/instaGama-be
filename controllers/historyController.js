import History from '../models/History.js';

export const createHistory = async (req, res) => {

  const { url, descripcion } = req.body
  const { usuario } = req

  try {

    const historia = new History({ url, descripcion: descripcion || "", autor: usuario.id })

    await historia.save()
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
export const getHistories = async (req, res) => {

  const { uid } = req.params

  try {
    const historias = await History.find({ autor: uid }).populate("autor", "foto name userName")

    res.json({

      historias
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor"
    })
  }
}
export const deleteHistory = async (req, res) => {

  const { id: idHistory } = req.params
  const { id: uid } = req.usuario

  try {
    const historia = await History.findById(idHistory)
    if (!historia) {
      return res.status(400).json({
        msg: "La historia que intenta eliminar no existe."
      })
    }
    if (historia.autor.toString() !== uid) {
      return res.status(400).json({
        msg: "Este usuario no tiene permitido eliminar esta historia."
      })
    }
    await History.deleteOne({ _id: idHistory })

    res.json({
      ok: true,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor"
    })
  }
}