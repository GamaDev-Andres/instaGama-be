import express from "express";
import { check } from 'express-validator';

import { createUser } from '../controllers/usersController.js';
import { emailExiste } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = express.Router()
// api / users
router.post("/create", [
  check("email", "El email es obligatorio").isEmail(),
  check("email").custom(emailExiste),
  check("password", "La contraseña debe tener minimo 6 caracteres").isLength({ min: 6 }),
  check("name", "El nombre es obligatorio").not().isEmpty(),
], validarCampos, createUser)

export default router