import express from "express";

let router = express.Router();
import { signUp } from "../Controller/auth.controller.js";

router.post("/signup", signUp);

export default router;
