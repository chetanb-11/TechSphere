import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
            <div className="relative pt-[60%] overflow-hidden bg-gray-100">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {product.category}
                </div>
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2" title={product.title}>
                        {product.title}
                    </h3>
                </div>
                
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow" title={product.description}>
                    {product.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-extrabold text-blue-600">${product.price.toFixed(2)}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-400">
                    <span title="Clicks today">🔥 {product.clickedToday} today</span>
                    <span title="Clicks this week">📈 {product.clickedWeek} this week</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
