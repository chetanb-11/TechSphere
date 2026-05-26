import { Router, Request, Response } from "express";
import { signin, signup } from "./auth.controller";
import { requireSignin, checkAdmin } from "../../middleware/auth.middleware";

// Stub controllers
const getAllUser = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Get all users placeholder" });
};

const getUserByID = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Get user by ID placeholder", id: req.params._id });
};

const router = Router();

// Route for signing in a user
router.post("/signin", signin);
// Route for signing up a new user
router.post("/signup", signup);
// Route to get all users (requires admin permission)
router.get("/user", checkAdmin, getAllUser);
// Route to get user by ID (requires sign-in)
router.get("/user/:_id", getUserByID);

export default router;