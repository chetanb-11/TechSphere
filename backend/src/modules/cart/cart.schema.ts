import z4 from "zod/v4";

export const createCartSchema = z4.object({
    body: z4.object({
        userId: z4.string({ message: "userid is required" }).min(3),
        productId: z4.string({ message: "productsid is required"}).min(3),
        quantity: z4.number().int().nonnegative().default(0),
        price: z4.number({ message: "Price is required" }).positive(),
    })
})