import express from "express";
import { check } from 'express-validator';

import { confirmPassword, createUser, followController, getFollowers, getFollowing, getUser, updateUser } from '../controllers/usersController.js';
import { emailExiste, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()
// api / users
router.post("/create", [
  check("email", "El email es obligatorio").isEmail(),
  check("email").custom(emailExiste),
  check("password", "La contraseña debe tener minimo 6 caracteres").isLength({ min: 6, max: 50 }),
  check("name", "El nombre es obligatorio").not().isEmpty(),
], validarCampos, createUser)

router.put("/", validarJWT, [
  check("foto", "La foto debe ser un url").optional().isURL(),
  check("name", "El nombre es obligatorio").optional().not().isEmpty(),
  check("password", "La contraseña debe tener minimo 6 caracteres").optional().isLength({ min: 6 }),
], validarCampos, updateUser)

router.post("/follow/:id", validarJWT, [
  check("id").custom(existeUsuarioPorId),
], validarCampos, followController)

router.post("/confirmPassword", validarJWT, confirmPassword)

router.get("/:id", validarJWT, getUser)

router.get("/followers/:id", validarJWT, [
  check("id").custom(existeUsuarioPorId),
], validarCampos, getFollowers)

router.get("/following/:id", validarJWT, [
  check("id").custom(existeUsuarioPorId),
], validarCampos, getFollowing)

export default router