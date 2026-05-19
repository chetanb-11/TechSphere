import { ObjectId } from "mongodb";
import { getDb } from "../../config/db";
import { CartItem } from "./cart.model";
import { Product } from "../products/products.model";

export class CartService {
    static async addToCart(id: string) {
        const productId = new ObjectId(id);
        const db = getDb();

        const product = await db.collection('products').findOne({ _id: productId });
        if (!product) {
            throw new Error('Product not found');
        }

        const existingItem = await db.collection<CartItem>('cart').findOne({ productId });
        if (existingItem) {
            await db.collection<CartItem>('cart').updateOne(
                { productId },
                { $inc: { quantity: 1 } }
            );
        } else {
            await db.collection<CartItem>('cart').insertOne({
                productId: productId,
                quantity: 1,
                price: product.price,
                addedAt: new Date(),
            });
        }
    }

    static async allCartItems() {
        const db = getDb();
        return await db.collection('cart').aggregate([
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

    static async removeCartItem(id: string) {
        const cartItemId = new ObjectId(id)
        const db = getDb();
        const cartItem = await db.collection<CartItem>('cart').findOne({_id: cartItemId});

        if(!cartItem){
            throw new Error('Cart Item not found');
        }
        
        return await db.collection<CartItem>('cart').deleteOne({_id: cartItemId})
    }
}