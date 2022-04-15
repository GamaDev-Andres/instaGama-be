import express from 'express';
import { check } from 'express-validator';

import { deleteChat, deleteMessage, sendMessage } from '../controllers/inboxController.js';
import { existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()

router.use(validarJWT)

// api/inbox

router.post("/to/:uid", [check("uid").custom(existeUsuarioPorId),
check("text").optional().notEmpty()], validarCampos, sendMessage)

router.delete("/message/:mid", [check("mid", "el id del mensaje no es un id de mongo").isMongoId()], validarCampos, deleteMessage)
router.delete("/chat/:cid", [check("cid").isMongoId()], validarCampos, deleteChat)

export default router