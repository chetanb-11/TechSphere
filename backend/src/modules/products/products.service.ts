import { Product } from './products.model';
import { getDb } from '../../config/db';
import { ObjectId } from 'mongodb';

export class ProductsService {
    static async getAllProducts(): Promise<Product[]> {
        const db = getDb();
        return await db.collection<Product>('products').find({}).toArray();
    }

    static async getAllProductsByCategory(category: string): Promise<Product[]> {
        const db = getDb();
        return await db.collection<Product>('products').find({ category }).toArray();
    }

    static async getAllTodayTrendingProducts(): Promise<Product[]> {
        const db = getDb();
        return await db.collection<Product>('products').find({}).sort({ clickedToday: -1 }).toArray();
    }

    static async getAllWeekTrendingProducts(): Promise<Product[]> {
        const db = getDb();
        return await db.collection<Product>('products').find({}).sort({ clickedWeek: -1 }).toArray();
    }

    static async getAllProductsByBrand(brand: string): Promise<Product[]> {
        const db = getDb();
        return await db.collection<Product>('products').find({ brand }).toArray();
    }

    static async getProductsById(id: string): Promise<Product | null> {
        const db = getDb();
        return await db.collection<Product>('products').findOne({ _id: new ObjectId(id) });
    }

    static async incrementProductClick(id: string) {
        const db = getDb();
        const productid = new ObjectId(id);
        const result = await db.collection('products').updateOne(
            { _id: productid },
            {
                $inc: {
                    clickedToday: 1,
                    clickedWeek: 1,
                }
            });
    }

    static async createProduct(title: string, description: string, price: number, stock: number, image: string, brand: string, category: string) {
        const db = getDb();
        const newProduct: Product = {
            title: title || "",
            description: description || "",
            price: Number(price) || 0,
            stock: Number(stock) || 0,
            image: image || "",
            brand: brand || "",
            category: category || "",
            clickedToday: 0,
            clickedWeek: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            new: true,
        }
        const result = await db.collection<Product>('products').insertOne(newProduct);

        return { ...newProduct, _id: result.insertedId };

    }
}