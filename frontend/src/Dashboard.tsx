import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './layouts/navbar';
import { Product } from './types';
import ProductSection from './components/ProductSection';

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/products/dummy');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Derived state
    const categories = useMemo(() => {
        const uniqueCategories = new Set(products.map(p => p.category));
        return ['All', ...Array.from(uniqueCategories)].sort();
    }, [products]);

    const trendingToday = useMemo(() => {
        return [...products].sort((a, b) => b.clickedToday - a.clickedToday).slice(0, 5);
    }, [products]);

    const trendingWeek = useMemo(() => {
        return [...products].sort((a, b) => b.clickedWeek - a.clickedWeek).slice(0, 5);
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = product.title.toLowerCase().includes(searchLower) || 
                                  product.description.toLowerCase().includes(searchLower) ||
                                  product.brand.toLowerCase().includes(searchLower);
            
            return matchesCategory && matchesSearch;
        });
    }, [products, searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <main className="container mx-auto px-4 py-8">
                {/* Header & Controls */}
                <div className="mb-8 space-y-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">TechSphere Shop</h1>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search products, brands, descriptions..."
                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setSearchQuery('')}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        
                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center shadow-sm">
                        <p className="font-semibold text-lg">Failed to load products</p>
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Only show trending if not searching/filtering heavily */}
                        {searchQuery === '' && selectedCategory === 'All' && (
                            <>
                                <ProductSection title="🔥 Trending Today" products={trendingToday} />
                                <ProductSection title="📈 Hot This Week" products={trendingWeek} />
                            </>
                        )}
                        
                        <ProductSection 
                            title={searchQuery || selectedCategory !== 'All' ? `Search Results (${filteredProducts.length})` : 'All Products'} 
                            products={filteredProducts} 
                            emptyMessage="No products match your search criteria. Try a different term or category."
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;