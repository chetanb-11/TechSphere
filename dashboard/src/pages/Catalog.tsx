import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { Button } from "../components/ui/Button";
import { ShoppingCart } from "lucide-react";

export function Catalog() {
  const products = useAppStore(state => state.products);
  const addToCart = useAppStore(state => state.addToCart);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filtered = selectedCategory 
    ? products.filter(p => p.category === selectedCategory) 
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
         
         <aside className="w-full md:w-64 shrink-0">
           <div className="sticky top-28">
             <h3 className="font-bold text-lg mb-6 tracking-tight">Categories</h3>
             <ul className="space-y-2">
               <li>
                 <button 
                   onClick={() => setSelectedCategory(null)}
                   className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === null ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                 >
                   All Products
                 </button>
               </li>
               {categories.map(cat => (
                 <li key={cat}>
                   <button 
                     onClick={() => setSelectedCategory(cat)}
                     className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                   >
                     {cat}
                   </button>
                 </li>
               ))}
             </ul>

             <h3 className="font-bold text-lg mb-6 mt-12 tracking-tight">Filters</h3>
             <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="inStock" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="inStock" className="text-sm font-medium text-slate-700">In Stock Only</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="sale" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="sale" className="text-sm font-medium text-slate-700">On Sale</label>
                </div>
             </div>
           </div>
         </aside>

         <main className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {selectedCategory || "All Tech"}
              </h1>
              <p className="text-slate-500 text-sm">{filtered.length} results</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(product => (
                <div key={product.id} className="group border border-slate-200 rounded-2xl p-4 bg-white flex flex-col hover:border-slate-300 transition-colors">
                  <Link to={`/product/${product.id}`} className="aspect-square bg-slate-50 rounded-xl mb-4 overflow-hidden relative block">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded">Out of Stock</div>
                    )}
                  </Link>
                  <div className="text-xs font-semibold text-slate-500 mb-1">{product.brand}</div>
                  <Link to={`/product/${product.id}`} className="font-bold text-slate-900 mb-1 leading-snug line-clamp-1 hover:text-blue-600 transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                     <span className="font-bold text-lg">${product.price}</span>
                     <Button 
                       size="sm" 
                       onClick={() => addToCart(product)}
                       disabled={product.stock === 0}
                       className="rounded-full shadow-none"
                     >
                       <ShoppingCart className="w-4 h-4 mr-2" /> Add
                     </Button>
                  </div>
                </div>
              ))}
            </div>
         </main>
      </div>
    </div>
  );
}
