import { ObjectId } from "mongodb";

export interface CartItem {
    _id?: ObjectId;
    productId: ObjectId;
    quantity: number;
    price: number;
    addedAt?: Date;
}
