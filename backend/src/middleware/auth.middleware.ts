import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    user?: {
        email: string;
        role: "admin" | "user" | "guest";
    };
}

export const requireSignin = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Placeholder - in production, verify JWT token from headers (e.g., req.headers.authorization)
        next();
    } catch (err: any) {
        res.status(401).json({ message: "Unauthorized access" });
    }
};

export const checkAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Placeholder - verify that req.user is admin
        if (req.user?.role !== "admin") {
            return res.status(403).json({ message: "Admin resource! Access denied" });
        }
        next();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
