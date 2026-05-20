import { ObjectId } from "mongodb";
import { getDb } from "../../config/db";
import { CartItem } from "./cart.model";
import { Product } from "../products/products.model";

export class CartService {
    static async addToCart(id: string, userId: string) {
        const productId = new ObjectId(id);
        const userObjId = new ObjectId(userId);
        const db = getDb();

        const product = await db.collection('products').findOne({ _id: productId });
        if (!product) {
            throw new Error('Product not found');
        }

        const existingItem = await db.collection<CartItem>('cart').findOne({ productId, userId: userObjId });
        if (existingItem) {
            await db.collection<CartItem>('cart').updateOne(
                { productId, userId: userObjId },
                { $inc: { quantity: 1 } }
            );
        } else {
            await db.collection<CartItem>('cart').insertOne({
                productId: productId,
                userId: userObjId,
                quantity: 1,
                price: product.price,
                addedAt: new Date(),
            });
        }
    }

    static async allCartItems(userId: string) {
        const db = getDb();
        const userObjId = new ObjectId(userId);

        return await db.collection('cart').aggregate([
            {
                $match: { userId: userObjId }
            },
            {
                // lookup in products collection as productDetails
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            // arr tp doc
            {
                $unwind: '$productDetails'
            },
            // reshape karte
            {
                $project: {
                    _id: 1,
                    productId: 1,
                    quantity: 1,
                    addedAt: 1,
                    name: '$productDetails.title',
                    description: '$productDetails.description',
                    price: '$productDetails.price',
                    stock: '$productDetails.stock',
                    image: '$productDetails.image',
                    brand: '$productDetails.brand',
                    category: '$productDetails.category'
                }
            }
        ]).toArray();
    }

    static async removeCartItem(id: string, userId: string) {
        const cartItemId = new ObjectId(id)
        const userObjId = new ObjectId(userId);
        const db = getDb();
        const cartItem = await db.collection<CartItem>('cart').findOne({ _id: cartItemId, userId: userObjId });

        if (!cartItem) {
            throw new Error('Cart Item not found');
        }

        return await db.collection<CartItem>('cart').deleteOne({ _id: cartItemId })
    }
}