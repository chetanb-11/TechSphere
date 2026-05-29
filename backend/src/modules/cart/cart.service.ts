import { getDb } from "../../config/db";
import { CartItem } from "./cart.model";
import { Product } from "../products/products.model";
import { toObjectId } from "../../utils/objectId";

export class CartService {
    static async addToCart(id: string, userId: string) {
        const productId = toObjectId(id, 'product ID');
        const userObjId = toObjectId(userId, 'user ID');
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
        const userObjId = toObjectId(userId, 'user ID');

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
        const cartItemId = toObjectId(id, 'cart item ID');
        const userObjId = toObjectId(userId, 'user ID');
        const db = getDb();
        const cartItem = await db.collection<CartItem>('cart').findOne({ _id: cartItemId, userId: userObjId });

        if (!cartItem) {
            throw new Error('Cart Item not found');
        }

        return await db.collection<CartItem>('cart').deleteOne({ _id: cartItemId })
    }
    static async emptyCart( userId: string) {
        const userObjId = toObjectId(userId, 'user ID');
        const db = getDb();
        const cartItem = await db.collection<CartItem>('cart').findOne({ userId: userObjId });

        if (!cartItem) {
            throw new Error('Cart Item not found');
        }

        return await db.collection<CartItem>('cart').deleteMany({userId: userObjId});
    }

    static async updateQuantity(id: string, userId: string, quantity: number) {
        const cartItemId = toObjectId(id, 'cart item ID');
        const userObjId = toObjectId(userId, 'user ID');
        const db = getDb();
        const cartItem = await db.collection<CartItem>('cart').findOne({ _id: cartItemId, userId: userObjId });

        if (!cartItem) {
            throw new Error('Cart Item not found');
        }

        return await db.collection<CartItem>('cart').updateOne(
            { _id: cartItemId },
            { $set: { quantity: Number(quantity) } }
        );
    }
}