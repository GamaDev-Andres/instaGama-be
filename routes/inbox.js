import express from 'express';
import { check } from 'express-validator';

import { sendMessage } from '../controllers/inboxController.js';
import { existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()

router.use(validarJWT)

// api/inbox

router.post("/to/:uid", [check("uid").custom(existeUsuarioPorId),
check("mensaje").optional().notEmpty()], validarCampos, sendMessage)

export default router