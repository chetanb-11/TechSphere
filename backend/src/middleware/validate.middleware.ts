import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod/v4";

export const validate = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        req.body = parsed.body;
        req.query = parsed.query as any;
        req.params = parsed.params as any;


        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                error: error.issues.map(e => ({
                    field: e.path.join('.'),
                    message: e.message,
                }))
            })
        }
        return res.status(500).json({ message: "Internal server error during validation" });
    }
}