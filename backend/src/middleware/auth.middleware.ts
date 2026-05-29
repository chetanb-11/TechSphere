import { Request, Response, NextFunction } from "express";
import { getDb } from "../config/db";

import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        email: string;
        role: "admin" | "user" | "guest";
    };
}

export const requireSignin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized access: No token provided" });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET as string;

        const decoded = jwt.verify(token, secret) as { email: string; role: "admin" | "user" | "guest" };

        // Attach the authenticated user to the request
        req.user = { email: decoded.email, role: decoded.role };
        next();
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
             return res.status(401).json({ message: "Unauthorized access: Token expired" });
        }
        res.status(401).json({ message: "Unauthorized access: Invalid token" });
    }
};

export const checkAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ message: "Admin resource! Access denied" });
        }
        next();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
