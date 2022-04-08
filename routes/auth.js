import express from "express";
import { check } from 'express-validator';

import { loginUser, renovarToken } from '../controllers/authController.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = express.Router()
//  /api/auth
router.post("/login", [
  check("email", "El email es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
], validarCampos, loginUser)
router.get('/', validarJWT, renovarToken);

export default router