import { Router } from "express";
import { addToCart, cartItems, removeCartItem, updateQuantity } from "./cart.controller";

const router = Router();

router.get('/', cartItems);
router.post('/:id', addToCart);
router.post('/removecartitem/:id', removeCartItem);
router.patch('/:id', updateQuantity);
export default router;