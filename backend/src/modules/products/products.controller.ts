import { Request, Response } from 'express';
import { ProductsService } from "./products.service";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductsService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const productsByCategory = await ProductsService.getAllProductsByCategory(category as string);
        res.status(200).json(productsByCategory);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getProductsByBrand = async (req: Request, res: Response) => {
    try {
        const { brand } = req.params;
        const productsByBrand = await ProductsService.getAllProductsByBrand(brand as string);
        res.status(200).json(productsByBrand);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getTodayTrendingProducts = async (req: Request, res: Response) => {
    try {
        const todayTrendingProducts = await ProductsService.getAllTodayTrendingProducts();
        res.status(200).json(todayTrendingProducts);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getWeekTrendingProducts = async (req: Request, res: Response) => {
    try {
        const weekTrendingProducts = await ProductsService.getAllWeekTrendingProducts();
        res.status(200).json(weekTrendingProducts);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getProductsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await ProductsService.getProductsById(id as string);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const incrementProductClick = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const product = await ProductsService.incrementProductClick(id as string);
        res.json(200)
    } catch (error){
        res.status(500).json({message: "Internal server error", error});
    }
}