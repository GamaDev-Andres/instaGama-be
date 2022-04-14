import express from 'express';
import { check } from 'express-validator';

import { createHistory, deleteHistory, getHistories } from '../controllers/historyController.js';
import { existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()
// api/history

router.use(validarJWT)

router.post("", [check("url", "Debe enviar una url valida").isURL()], validarCampos, createHistory)
router.get("/:uid", [check("uid").custom(existeUsuarioPorId)], validarCampos, getHistories)
router.delete("/:id", deleteHistory)

export default router