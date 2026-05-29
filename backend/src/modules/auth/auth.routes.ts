import { Router, Request, Response } from "express";
import { signin, signup, getAllUser, getUser } from "./auth.controller";
import { requireSignin, checkAdmin } from "../../middleware/auth.middleware";

const router = Router();

// Route for signing in a user
router.post("/signin", signin);
// Route for signing up a new user
router.post("/signup", signup);
// Route to get all users (requires admin permission)
router.get("/user", checkAdmin, getAllUser);
// Route to get user by ID (requires sign-in)
router.get("/user/:_id", requireSignin, getUser);

export default router;