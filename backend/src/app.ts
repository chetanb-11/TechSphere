import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Ecommerce API is running!');
});
app.get('/api/data', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

export default app;
