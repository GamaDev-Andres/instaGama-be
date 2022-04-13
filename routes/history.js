import express from 'express';
import { check } from 'express-validator';

import { createHistory } from '../controllers/historyController.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()
// api/history

router.use(validarJWT)

router.post("", [check("url", "Debe enviar una url valida").isURL()], validarCampos, createHistory)
export default router