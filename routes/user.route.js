import express from "express"
import { getAllUsers, Login, Register } from "../controller/user.controller.js"

const router = express.Router()

router.post("/register", Register);

router.post("/login", Login);

router.get("/", getAllUsers);

export default router;