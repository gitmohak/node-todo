import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { userDetails, userLogin, userLogout, userRegister } from "../controllers/user.js";

export const router = express.Router();

router.post("/login", userLogin)
router.post("/register", userRegister)
router.get("/logout", isAuthenticated, userLogout)
router.get("/profile", isAuthenticated, userDetails)