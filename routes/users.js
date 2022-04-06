import express from "express";
import { getUSers } from '../controllers/usersController.js';
const router = express.Router()
//  /api/users
router.get("/", getUSers)

export default router