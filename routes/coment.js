import express from 'express';
import { check } from 'express-validator';

import { createComent } from '../controllers/comentController.js';
import { existePostPorId } from '../helpers/db-validators.js';
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
export default router