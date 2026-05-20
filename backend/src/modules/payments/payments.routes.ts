import { Router } from "express";
import { createPaymentintent } from "./payments.controller";

const router = Router();

router.post('/create-payment-intent', createPaymentintent);

export default router;