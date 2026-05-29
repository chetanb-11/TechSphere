import Stripe from 'stripe';
import { Request, Response } from 'express';
import { CartService } from '../cart/cart.service';
import { AuthRequest } from '../../middleware/auth.middleware';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-04-22.dahlia',
});

export const createPaymentintent = async (req: Request, res:Response) => {
    try {
        const { items } = req.body;

        let amount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
        amount = (amount + 15 + (amount * 0.08)) * 100;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: 'inr',
        });

        const authReq = req as any;
        const userId = authReq.user?.id || req.body.userId || items?.[0]?.userId;
        if (userId) {
            await CartService.emptyCart(userId);
        }

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err: any) {
        res.status(500).json({error: err.message});
    }
}