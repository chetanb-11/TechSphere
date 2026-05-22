import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, Package, LogOut } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { useAuthStore } from "../store/useAuthStore";

export function StoreLayout() {
  const cartItems = useAppStore(state => state.cartItems) || [];
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { isAuthenticated, user, signout } = useAuthStore();
  const { searchResults, isSearching, searchProducts, fetchCartItems } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      fetchCartItems(user.userId);
    }
  }, [user, fetchCartItems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        searchProducts(searchQuery);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, searchProducts]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setShowDropdown(false);
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              CartFordge
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/catalog" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Catalog</Link>
            <Link to="/catalog?new=true" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">New Arrivals</Link>
            <Link to="/catalog?deals=true" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Deals</Link>
            {user?.role == "admin" && <Link to="/admin" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Admin</Link>}
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative hidden md:block" ref={searchRef}>
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (searchQuery.trim().length > 0) setShowDropdown(true); }}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none w-56 lg:w-72"
              />

              {showDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  {isSearching ? (
                    <div className="p-4 text-center text-sm text-slate-500">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <ul className="max-h-96 overflow-y-auto">
                      {searchResults.slice(0, 4).map((product) => (
                        <li key={product.id}>
                          <Link
                            to={`/product/${product.id}`}
                            onClick={() => {
                              setShowDropdown(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                          >
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded bg-slate-100" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                              <p className="text-xs text-slate-500 font-medium">₹{product.price}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                      {searchResults.length > 4 && (
                        <li className="p-2 border-t border-slate-100">
                          <Link
                            to={`/catalog?q=${encodeURIComponent(searchQuery.trim())}`}
                            onClick={() => setShowDropdown(false)}
                            className="block w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            View all {searchResults.length} results
                          </Link>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-sm text-slate-500">No results found</div>
                  )}
                </div>
              )}
            </div>
            <Link to="/cart" className="p-2 text-slate-600 hover:bg-slate-50 rounded-full relative transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 hidden sm:block max-w-[120px] truncate">{user?.email}</span>
                <button
                  onClick={() => signout()}
                  className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors hidden sm:block"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors">
                <User className="w-4 h-4" />
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 mt-24 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  <Package className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900">VoltGadgets</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm mb-6">
                Engineered for the modern professional. Precision technology that empowers your best work.
              </p>
              <div className="flex gap-2">
                <input type="email" placeholder="Subscribe to tech news" className="px-4 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-blue-500 flex-1 max-w-xs" />
                <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">Join</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Products</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Laptops & Desktops</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Mobile & Tablets</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Audio & Wearables</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Displays & Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Support Center</a></li>
                <li>{user?.role === "admin" && (<Link to="/admin" className="hover:text-blue-600 transition-colors">Admin Console</Link>)};</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">
              © 2026 VoltGadgets Precision Engineering. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Shipping Returns</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
