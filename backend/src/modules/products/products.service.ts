import { product } from './products.model';
import { getDb } from '../../config/db';
import { ObjectId } from 'mongodb';

export class ProductsService {
    static async getAllProducts(): Promise<product[]> {
        const db = getDb();
        const products = await db.collection<product>('products').find({}).toArray();
        if (products) {
            return products;
        } else {
            return [];
        }
    }

    static async getAllProductsByCategory(category: string): Promise<product[]> {
        const db = getDb();
        const productsByCategory = await db.collection<product>('products').find({ category }).toArray();
        if (productsByCategory) {
            return productsByCategory;
        } else {
            return [];
        }
    }

    static async getAllTodayTrendingProducts(): Promise<product[]> {
        const db = getDb();
        const TodayTrendingProducts = await db.collection<product>('products').find({}).sort({ clickedToday: -1 }).toArray();
        if (TodayTrendingProducts) {

            return TodayTrendingProducts;
        } else {
            return [];
        }
    }

    static async getAllWeekTrendingProducts(): Promise<product[]> {
        const db = getDb();
        const TodayTrendingProducts = await db.collection<product>('products').find({}).sort({ clickedWeek: -1 }).toArray();
        if (TodayTrendingProducts) {

            return TodayTrendingProducts;
        } else {
            return [];
        }
    }

    static async getAllProductsBybrand(brand: string): Promise<product[]> {
        const db = getDb();
        const TodayTrendingProducts = await db.collection<product>('products').find({ brand }).toArray();
        if (TodayTrendingProducts) {
            return TodayTrendingProducts;
        } else {
            return [];
        }
    }

    static async getProductsById(id: string): Promise<product | null> {
        const db = getDb();
        const product = await db.collection<product>('products').findOne({ _id: new ObjectId(id) });
        return product;
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
}