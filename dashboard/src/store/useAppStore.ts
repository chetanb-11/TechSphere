import { create } from "zustand";
import { apiService, User } from "../services/api";
import { useAuthStore } from "./useAuthStore";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  description: string;
  brand: string;
  clickedToday: number;
  clickedWeek: number;
  new: boolean;
}

export interface CartItem extends Product {
  productId: string;
  userId: string;
  quantity: number;
}

interface AppState {
  products: Product[];
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchCartItems: (userId: string) => Promise<void>;
  searchResults: Product[];
  isSearching: boolean;
  searchError: string | null;
  searchProducts: (query: string) => Promise<void>;
  addToCart: (product: Product, userId: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string, userId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  products: [],
  cartItems: [],
  searchResults: [],
  isLoading: false,
  isSearching: false,
  error: null,
  searchError: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await apiService.getProducts();
      set({ products, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch products", isLoading: false });
    }
  },

  addToCart: async (product, userId, quantity = 1) => {
    try {
      await apiService.addToCart(product.id, userId);
      set((state) => {
        const existing = state.cartItems.find(item => item.productId === product.id);
        if (existing) {
          return { cartItems: state.cartItems.map(item => item.productId === product.id ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) } : item) };
        }
        // Use a temporary id for the cart entry; real cart _id comes on next fetch
        return { cartItems: [...state.cartItems, { ...product, id: `temp-${Date.now()}`, productId: product.id, userId, quantity: Math.min(product.stock, quantity) }] };
      });
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  },
  searchProducts: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [], isSearching: false, searchError: null });
      return;
    }
    set({ isSearching: true, searchError: null });
    try {
      const searchResults = await apiService.searchProducts(query);
      set({ searchResults, isSearching: false });
    } catch (err: any) {
      // Fallback: If API search fails (e.g. 404 because backend route doesn't exist), filter local products
      let { products } = get();
      
      // If products haven't been loaded yet (e.g. direct load of search page), fetch them first
      if (products.length === 0) {
        await get().fetchProducts();
        products = get().products;
      }
      
      const lowerQuery = query.toLowerCase();
      const localResults = products.filter(p => 
        (p.name || "").toLowerCase().includes(lowerQuery) ||
        (p.description || "").toLowerCase().includes(lowerQuery) ||
        (p.brand || "").toLowerCase().includes(lowerQuery) ||
        (p.category || "").toLowerCase().includes(lowerQuery)
      );
      set({ searchResults: localResults, isSearching: false });
    }
  },
  fetchCartItems: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const cartItems = await apiService.getCartItems(userId);
      set({ cartItems, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch cart items", isLoading: false });
    }
  },
  removeFromCart: async (cartItemId, userId) => {
    try {
      await apiService.removeFromCart(cartItemId, userId);
      set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== cartItemId)
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to remove item from cart" });
    }
  },
  updateQuantity: async (cartItemId, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map(item => item.id === cartItemId ? { ...item, quantity } : item)
    }));
    const userId = useAuthStore.getState().user?.userId;
    if (userId) {
      try {
        await apiService.updateCartQuantity(cartItemId, userId, quantity);
      } catch (err: any) {
        console.error("Failed to update cart quantity on server:", err);
      }
    }
  }
}));

