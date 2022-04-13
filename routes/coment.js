import express from 'express';
import { check } from 'express-validator';

import { createComent, deleteComent, getComentsOfPost, updateComent } from '../controllers/comentController.js';
import { existeComentPorId, existePostPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarUser } from '../middlewares/validar-usuario.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()
// api/coment
router.use(validarJWT)

router.post("/create", [
  check("idPost").custom(existePostPorId),
  check("text", "El text es obligatorio").not().isEmpty(),

], validarCampos, validarUser, createComent)

router.put("/:idComent", [
  check("idPost").custom(existePostPorId),
  check("idComent", "el id no es un id de mongo").isMongoId(),
  check("idComent").custom(existeComentPorId),
  check("text", "El text es obligatorio").not().isEmpty()
], validarCampos, validarUser, updateComent)

router.delete("/:idComent", [
  check("idPost").custom(existePostPorId),
  check("idComent", "el id no es un id de mongo").isMongoId(),
  check("idComent").custom(existeComentPorId),
], validarCampos, validarUser, deleteComent)

router.get("/:idPost", [
  check("idPost").custom(existePostPorId),
], validarCampos, validarUser, getComentsOfPost)

export default router