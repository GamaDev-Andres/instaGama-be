import express from "express"
import { check } from 'express-validator'

import { createPost, deletePost, getPost, getPostsOfFollowing, updatePost } from '../controllers/postController.js'
import { existePostPorId } from '../helpers/db-validators.js'
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarUser } from '../middlewares/validar-usuario.js'
import { validarJWT } from '../middlewares/validarJWT.js'

const router = express.Router()

// api/post
router.use(validarJWT)

router.post("/create", [
  check("url", "La url de la imagen es obligatoria").isURL(),
], validarCampos, validarUser, createPost)

router.delete("/:id", [
  check("id", "el id debe ser un id de mongo").isMongoId(),
  check("id").custom(existePostPorId),
], validarCampos, validarUser, deletePost)

router.put("/:id", [
  check("id", "el id debe ser un id de mongo").isMongoId(),
  check("id").custom(existePostPorId),
  check("descripcion", "La descripcion es necesaria para actualizar").not().isEmpty(),
], validarCampos, validarUser, updatePost)

router.get("/following", validarUser, getPostsOfFollowing)
router.get("/:id", getPost)

export default router