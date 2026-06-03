import z4 from "zod/v4";

export const createAuthSchema = z4.object({
    body: z4.object({
        email: z4.string().email({ message: "Invalid email address" }),
        password: z4.string().min(8, { message: "Password must be at least 8 characters long" }),
        role: z4.enum(["admin", "user", "guest"]).optional()
    })
})