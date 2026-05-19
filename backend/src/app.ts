import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import productsRoutes from './modules/products/products.routes';
import cartRoutes from './modules/cart/cart.routes';

const app: Express = express();

const corsOptions: cors.CorsOptions = {
    origin: [process.env.FRONTEND_DOMAIN || '', 'http://localhost:5173', 'http://localhost:3000']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Ecommerce API is running!');
});

export default app;
