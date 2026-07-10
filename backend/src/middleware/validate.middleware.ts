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
        
        Object.defineProperty(req, 'query', {
            value: parsed.query,
            writable: true,
            configurable: true,
            enumerable: true
        });

        Object.defineProperty(req, 'params', {
            value: parsed.params,
            writable: true,
            configurable: true,
            enumerable: true
        });


        return next();
    } catch (error: any) {
        console.error("Validation error occurred:", error);

        const isZodError = error instanceof ZodError || 
            (error && typeof error === 'object' && error.name === 'ZodError') ||
            (error && typeof error === 'object' && Array.isArray(error.issues));

        if (isZodError) {
            return res.status(400).json({
                message: "Validation failed",
                error: error.issues.map((e: any) => ({
                    field: e.path.join('.'),
                    message: e.message,
                }))
            });
        }
        return res.status(500).json({ 
            message: "Internal server error during validation",
            details: error instanceof Error ? error.message : String(error)
        });
    }
};