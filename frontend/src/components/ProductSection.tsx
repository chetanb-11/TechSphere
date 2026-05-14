import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
    title: string;
    products: Product[];
    emptyMessage?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, emptyMessage = 'No products found.' }) => {
    return (
        <section className="py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500 inline-block">
                {title}
            </h2>
            
            {products.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                    {emptyMessage}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductSection;
