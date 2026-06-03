// import z from "zod";
import z4 from "zod/v4";

export const createProductSchema = z4.object({
    body: z4.object({
        title: z4.string({ message: "Product title is required" }).min(3),
        description: z4.string().optional(),
        price: z4.number({ message: "Price is required" }).positive(),
        stock: z4.number().int().nonnegative().default(0),
        image: z4.string({ message: "Image URL is required" }).url(),
        brand: z4.string().optional(),
        category: z4.string({ message: "Category is required" }),
    })
})