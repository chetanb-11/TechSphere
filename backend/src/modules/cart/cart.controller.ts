import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { getDb } from '../../config/db';
import { CartItem } from './cart.model';

export const addToCart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        await CartService.addToCart(id);
        res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const cartItems = async (req: Request, res: Response) => {
    try {
        const allCartItems = await CartService.allCartItems();
        res.status(200).json(allCartItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const removeCartItem = async (req: Request, res: Response) => {
    try {
        const cartItemId = req.params.id as string;
        await CartService.removeCartItem(cartItemId);
        res.status(201).json({ message: "Product removed from cart" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        }
}