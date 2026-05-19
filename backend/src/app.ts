import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import productsRoutes from './modules/products/products.routes';
import cartRoutes from './modules/cart/cart.routes';
import { connectToDatabase } from './config/db';

const app: Express = express();

const corsOptions: cors.CorsOptions = {
    origin: [process.env.FRONTEND_DOMAIN || '', 'http://tech-sphere-dashboard.vercel.app', 'http://localhost:3000']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Lazy Connection for Serverless
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (err: any) {
        console.error("Database connection failed:", err);
        res.status(500).json({ error: "Database connection failed", details: err.message });
    }
});

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Ecommerce API is running!');
});

export default app;
