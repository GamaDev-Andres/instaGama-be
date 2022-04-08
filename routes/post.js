import express from "express"
import { check } from 'express-validator'

import { createPost } from '../controllers/postController.js'
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarUser } from '../middlewares/validar-usuario.js'
import { validarJWT } from '../middlewares/validarJWT.js'

const router = express.Router()

// api/post
router.use(validarJWT)
router.post("/create", [
  check("url", "La url de la imagen es obligatoria").not().isEmpty(),
], validarCampos, validarUser, createPost)

export default router