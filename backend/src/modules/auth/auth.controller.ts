
import { Request, Response } from "express";
import { getDb } from "../../config/db";
import { User } from "./auth.model";
import bcrypt from "bcrypt";

export const signin = async (req: Request, res: Response) => {
    try {
        const db = getDb();
        const { email, password } = req.body;
        const user = await db.collection<User>('user').findOne({
            email: email
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.status(200).json({ 
                message: "Login success placeholder",
                userId: user._id,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const db = getDb();
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const alreadyUser = await db.collection<User>('user').findOne({ email: email });
        if (alreadyUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: User = {
            email,
            password: hashedPassword,
            role: role || "user"
        };

        const result = await db.collection<User>('user').insertOne(newUser);
        res.status(201).json({ message: "User created successfully", userId: result.insertedId });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}