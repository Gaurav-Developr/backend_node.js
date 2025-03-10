import { router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = router()

router.route("/register").post(registerUser),
router.route("/login").post(login)

export default router