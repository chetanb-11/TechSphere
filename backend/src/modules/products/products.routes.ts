import { Router } from 'express';
import { getProductByCategory, getProducts, getProductsByBrand, getProductsById, getTodayTrendingProducts, getWeekTrendingProducts, incrementProductClick } from './products.controller';

const router = Router();

router.get('/', getProducts);

// Static routes MUST come before dynamic routes like /:category
router.get('/trending/today', getTodayTrendingProducts);
router.get('/trending/week', getWeekTrendingProducts);
router.get('/id/:id', getProductsById);
router.patch('/id/:id/click', incrementProductClick);
router.get('/brands/:brand', getProductsByBrand);
router.get('/:category', getProductByCategory);

export default router;
