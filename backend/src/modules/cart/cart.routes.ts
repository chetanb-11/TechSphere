import { Router } from "express";
import { addToCart, cartItems, removeCartItem } from "./cart.controller";

const router = Router();

router.post('/:id', addToCart);
router.get('/', cartItems);
router.post('/removecartitem/:id', removeCartItem);
export default router;