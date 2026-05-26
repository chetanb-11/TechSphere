import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { getDb } from '../../config/db';
import { CartItem } from './cart.model';

export const addToCart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { userId } = req.body;
        await CartService.addToCart(id, userId);
        res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const cartItems = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;
        const allCartItems = await CartService.allCartItems(userId);
        res.status(200).json(allCartItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const removeCartItem = async (req: Request, res: Response) => {
    try {
        const cartItemId = req.params.id as string;
        const { userId } = req.body;
        await CartService.removeCartItem(cartItemId, userId);
        res.status(201).json({ message: "Product removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const updateQuantity = async (req: Request, res: Response) => {
    try {
        const cartItemId = req.params.id as string;
        const { userId, quantity } = req.body;
        await CartService.updateQuantity(cartItemId, userId, quantity);
        res.status(200).json({ message: "Cart item quantity updated" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}