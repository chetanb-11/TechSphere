import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "../components/ui/Button";
import { ShoppingCart, Check, Shield, Truck, RotateCcw } from "lucide-react";
import { useState, useEffect } from 'react';

export function ProductDetail() {
  const { id } = useParams();
  const products = useAppStore(state => state.products);
  const fetchProducts = useAppStore(state => state.fetchProducts);
  const isLoading = useAppStore(state => state.isLoading);
  const product = products.find(p => p.id === id);
  const addToCart = useAppStore(state => state.addToCart);
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  if (isLoading || (products.length === 0 && !product)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="h-4 w-48 bg-slate-200 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="aspect-square rounded-3xl bg-slate-100" />
          <div className="space-y-4 py-4">
            <div className="h-3 w-24 bg-slate-200 rounded" />
            <div className="h-8 w-3/4 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
            <div className="h-10 w-32 bg-slate-200 rounded-full mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="p-12 text-center text-slate-500">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="text-sm font-medium flex items-center gap-2 text-slate-500 mb-8">
         <Link to="/" className="hover:text-slate-900">Home</Link>
         <span>/</span>
         <Link to="/catalog" className="hover:text-slate-900">Catalog</Link>
         <span>/</span>
         <span className="text-slate-900">{product.name}</span>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col">
             <div className="mb-2 text-blue-600 font-bold uppercase tracking-wider text-xs">{product.brand}</div>
             <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">{product.name}</h1>
             <div className="text-3xl font-bold text-slate-900 mb-6">₹{product.price}</div>
             
             <p className="text-lg text-slate-600 leading-relaxed mb-8">
               {product.description}
             </p>

             <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="font-medium">
                    {product.stock > 0 ? `${product.stock} in stock - Ready to ship` : 'Currently out of stock'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Truck className="w-5 h-5 text-slate-400" />
                  <span>Free next-day delivery</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <span>2-year extended warranty</span>
                </div>
             </div>

             <div className="flex gap-4 mt-auto">
                <Button 
                   size="lg" 
                   className="flex-1 rounded-full text-base h-14" 
                   onClick={() => {
                     if (!isAuthenticated) {
                       navigate("/login");
                     } else if (user?.userId) {
                       addToCart(product, user.userId);
                     }
                   }}
                   disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
             </div>
          </div>
       </div>
    </div>
  );
}
