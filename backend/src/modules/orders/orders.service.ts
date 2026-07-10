import { getDb } from "../../config/db";
import { OrderItem } from "./orders.model";

export class OrderService{
    static async getAllOrdersById(userId : string){
        const db = getDb();

        return await db.collection("orders")
                       .find({userId: userId})
                       .sort({createdAt: -1})
                       .toArray();
    }

    static async getAllOrders(){
        const db = getDb();

        return await db.collection("orders")
                       .find({})
                       .sort({createdAt: -1})
                       .toArray();
    }

    static async createOrder(userId: string, orderData: any) {
        const db = getDb();
        const newOrder = {
            userId,
            ...orderData,
            createdAt: new Date(),
        };
        const result = await db.collection("orders").insertOne(newOrder);
        return { ...newOrder, _id: result.insertedId };
    }
}