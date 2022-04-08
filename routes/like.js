import express from 'express';
import { check } from 'express-validator';

import { handleLike } from '../controllers/likeController.js';
import { existePostPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarUser } from '../middlewares/validar-usuario.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()
// api/like
router.use(validarJWT)
router.post("", [
  check("idPost").custom(existePostPorId),
], validarCampos, validarUser, handleLike)
export default router