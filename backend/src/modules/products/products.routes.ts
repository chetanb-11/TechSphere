import { Router } from 'express';
import { createProduct, getProductByCategory, getProducts, getProductsByBrand, getProductsById, getTodayTrendingProducts, getWeekTrendingProducts, incrementProductClick, searchProducts } from './products.controller';
import { checkAdmin, requireSignin } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', getProducts);
router.post('/', requireSignin, checkAdmin, createProduct);
// Static routes MUST come before dynamic routes like /:category
router.get('/trending/today', getTodayTrendingProducts);
router.get('/trending/week', getWeekTrendingProducts);
router.get('/id/:id', getProductsById);
router.patch('/id/:id/click', incrementProductClick);
router.get('/brands/:brand', getProductsByBrand);
router.get('/search/:query', searchProducts);
router.get('/:category', getProductByCategory);

export default router;
