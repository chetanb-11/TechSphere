
import { Request, Response } from "express";
import { User } from "./auth.model";
import { AuthService } from "./auth.service";
import { getDb } from "../../config/db";

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, isMatch, token } = await AuthService.signin(email, password);

        if (!user || !isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login success placeholder",
            userId: user._id,
            email: user.email,
            role: user.role,
            token: token,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const { alreadyUser, result, token } = await AuthService.signup(email, password, role);
        if (alreadyUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        res.status(201).json({ 
            message: "User created successfully", 
            userId: result.insertedId,
            token: token,
         });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const allUser = await AuthService.getAllUser();
        res.status(200).json(allUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const user = await AuthService.getUser(_id as string);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}