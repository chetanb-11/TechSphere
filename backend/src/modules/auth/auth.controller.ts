
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Login success placeholder" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}