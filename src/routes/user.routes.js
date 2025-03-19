import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()
// upload ek middleware hai jo hmne controller s phle inject ki hai
router.route("/register").post(upload.fields([{name:"avatar", maxCount:1},{name:"coverImage",maxCount:3}]), registerUser)

export default router