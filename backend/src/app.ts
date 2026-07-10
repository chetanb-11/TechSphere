import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import productsRoutes from './modules/products/products.routes';
import cartRoutes from './modules/cart/cart.routes';
import { connectToDatabase } from './config/db';
import paymentsRoutes from './modules/payments/payments.routes';
import authRoutes from './modules/auth/auth.routes';
import { requireSignin } from './middleware/auth.middleware';
import orderRouter from './modules/orders/orders.routes';

const app: Express = express();

const corsOptions: cors.CorsOptions = {
    origin: [process.env.FRONTEND_DOMAIN || '', 'https://tech-sphere-dashboard.vercel.app', 'http://localhost:5173', 'http://localhost:3000']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Lazy Connection for Serverless
// app.use(async (req, res, next) => {
//     try {
//         await connectToDatabase();
//         next();
//     } catch (err: any) {
//         console.error("Database connection failed:", err);
//         res.status(500).json({ error: "Database connection failed", details: err.message });
//     }
// });

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/cart', requireSignin, cartRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRouter);

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Ecommerce API is running!');
});

export default app;
