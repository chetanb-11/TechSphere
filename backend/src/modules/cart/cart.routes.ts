import { Router } from "express";
import { addToCart, cartItems, removeCartItem, updateQuantity } from "./cart.controller";
import { validate } from "../../middleware/validate.middleware";
import { createCartSchema } from "./cart.schema";

const router = Router();

router.get('/', validate(createCartSchema), cartItems);
router.post('/:id', addToCart);
router.post('/removecartitem/:id', removeCartItem);
router.patch('/:id', updateQuantity);
export default router;