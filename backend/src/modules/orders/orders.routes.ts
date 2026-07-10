import { Router } from "express";
import { createOrder, getOrders, getOrdersById } from "./orders.controller";
import { requireSignin, checkAdmin } from "../../middleware/auth.middleware";

const orderRouter = Router();

orderRouter.get("/:id", getOrdersById);
orderRouter.get("/", requireSignin, checkAdmin, getOrders);
orderRouter.post("/:id", createOrder);

export default orderRouter;