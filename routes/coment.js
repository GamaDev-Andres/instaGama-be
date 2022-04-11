import express from 'express';
import { check } from 'express-validator';

import { createComent, deleteComent, updateComent } from '../controllers/comentController.js';
import { existePostPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarUser } from '../middlewares/validar-usuario.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()
// api/coment
router.use(validarJWT)
router.use([check("idPost").custom(existePostPorId),
check("text", "El text es obligatorio").not().isEmpty()])
router.post("/create", [
], validarCampos, validarUser, createComent)

router.put("/:idComent", [
  check("idComent", "el id no es un id de mongo").isMongoId(),
  check("idPost").custom(existePostPorId),
], validarCampos, validarUser, updateComent)
router.delete("/:idComent", [
  check("idComent", "el id no es un id de mongo").isMongoId(),
  check("idPost").custom(existePostPorId),

], validarCampos, validarUser, deleteComent)

export default router