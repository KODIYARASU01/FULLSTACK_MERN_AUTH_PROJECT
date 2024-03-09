import express from "express";

let router = express.Router();
import { signUp,signIn ,google} from "../Controller/auth.controller.js";

router.post("/signup", signUp);
router.post('/signin',signIn);
router.post('/google',google)

export default router;
