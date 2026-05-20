import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "../components/ui/Button";
import { ShoppingCart } from "lucide-react";

export function Catalog() {
  const products = useAppStore(state => state.products);
  const fetchProducts = useAppStore(state => state.fetchProducts);
  const searchResults = useAppStore(state => state.searchResults);
  const searchProducts = useAppStore(state => state.searchProducts);
  const isLoading = useAppStore(state => state.isLoading);
  const isSearching = useAppStore(state => state.isSearching);
  const error = useAppStore(state => state.error);
  const searchError = useAppStore(state => state.searchError);
  const addToCart = useAppStore(state => state.addToCart);
  const { user, isAuthenticated } = useAuthStore();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
      searchProducts(query);
      setSelectedCategory(null);
    } else {
      fetchProducts();
    }
  }, [fetchProducts, searchProducts, query]);
  const displayProducts = query ? searchResults : products;
  const displayLoading = query ? isSearching : isLoading;
  const displayError = query ? searchError : error;

  const categories = products.length > 0
    ? Array.from(new Set(products.map(p => p.category)))
    : ["Laptops", "Mobile", "Audio", "Tablets", "Wearables", "Displays"];

  const filtered = selectedCategory
    ? displayProducts.filter(p => p.category === selectedCategory)
    : displayProducts;

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
                    onClick={() => {
                      if (query) navigate("/catalog");
                      setSelectedCategory(cat);
                    }}
                    disabled={displayLoading}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'} ${displayLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              {query ? `Search Results for "${query}"` : (selectedCategory || "All Tech")}
            </h1>
            <div className="flex items-center gap-4">
              {query && (
                <Button variant="outline" size="sm" onClick={() => navigate("/catalog")}>
                  Clear Search
                </Button>
              )}
              <p className="text-slate-500 text-sm">
                {displayLoading ? "Loading..." : `${filtered.length} results`}
              </p>
            </div>
          </div>

          {displayLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-4 bg-white flex flex-col animate-pulse">
                  <div className="aspect-square bg-slate-100 rounded-xl mb-4" />
                  <div className="h-3 bg-slate-100 rounded w-1/4 mb-2" />
                  <div className="h-5 bg-slate-100 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-5/6 mb-1" />
                  <div className="h-3 bg-slate-100 rounded w-4/6 mb-4" />
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <div className="h-6 bg-slate-100 rounded w-1/4" />
                    <div className="h-8 bg-slate-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayError ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-red-50/50 rounded-3xl border border-red-100/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 font-bold text-2xl shadow-inner">
                !
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Failed to load catalog</h3>
              <p className="text-slate-500 text-sm max-w-sm mb-6 leading-relaxed">
                {displayError}. Please check if your backend server is running on <code className="px-1.5 py-0.5 bg-slate-100 rounded text-red-600 font-mono text-xs">localhost:3001</code>.
              </p>
              <Button onClick={() => query ? searchProducts(query) : fetchProducts()} className="shadow-lg shadow-blue-500/10 px-6">
                Try Again
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50/50 rounded-3xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500 text-sm max-w-xs mb-6">
                No items match your selected filters. Try choosing a different category or resetting your search.
              </p>
              {query ? (
                <Button onClick={() => navigate("/catalog")} variant="outline" className="px-6">
                  Clear Search
                </Button>
              ) : (
                <Button onClick={() => setSelectedCategory(null)} variant="outline" className="px-6">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
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
                    <span className="font-bold text-lg">₹{product.price}</span>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (!isAuthenticated) {
                          navigate("/login");
                        } else if (user?.userId) {
                          addToCart(product, user.userId);
                        }
                      }}
                      disabled={product.stock === 0}
                      className="rounded-full shadow-none"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
