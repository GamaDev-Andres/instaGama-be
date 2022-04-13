import express from "express";
import { check } from 'express-validator';

import { createUser, followController, getFollowers, getFollowing, getUser } from '../controllers/usersController.js';
import { emailExiste, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()
// api / users
router.post("/create", [
  check("email", "El email es obligatorio").isEmail(),
  check("email").custom(emailExiste),
  check("password", "La contraseña debe tener minimo 6 caracteres").isLength({ min: 6 }),
  check("name", "El nombre es obligatorio").not().isEmpty(),
], validarCampos, createUser)

router.post("/follow/:id", validarJWT, [
  check("id").custom(existeUsuarioPorId),
], validarCampos, followController)

router.get("/:id", validarJWT, [
  check("id").custom(existeUsuarioPorId),
], validarCampos, getUser)

router.get("/followers/:id", validarJWT, [
  check("id").custom(existeUsuarioPorId),
], validarCampos, getFollowers)
router.get("/following/:id", validarJWT, [
  check("id").custom(existeUsuarioPorId),
], validarCampos, getFollowing)

export default router