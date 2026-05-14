import { ObjectId } from "mongodb";

export interface product {
    _id?: ObjectId; 
    title: string,
    description: string,
    price: number,
    stock: number,
    image: string,
    brand: string,
    category: string,
    clickedToday: number,
    clickedWeek: number,
    createdAt?: Date,
    updatedAt?: Date,
}