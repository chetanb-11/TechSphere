import { Request, Response } from "express";
import { OrderService } from "./orders.service";
import { CartService } from "../cart/cart.service";

export const getOrdersById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const orders = await OrderService.getAllOrdersById(userId);
        return res.status(200).json(orders);
    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrderService.getAllOrders();
        return res.status(200).json(orders);
    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const order = req.body;
        const result = await OrderService.createOrder(userId, order);
        await CartService.emptyCart(userId);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};