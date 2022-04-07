import express from "express";
import { loginUser } from '../controllers/usersController';
const router = express.Router()
//  /api/auth
router.post("/login", loginUser)
// router.get('/', validarJWT, renovarToken);

export default router