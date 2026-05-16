import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  description: string;
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const mockProducts: Product[] = [
  { id: "1", name: "VoltCore Pro X1", price: 2499, category: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", stock: 45, description: "Titanium chassis with Neural 9 Processor and 8K OLED Retina display. Engineered for extreme performance.", brand: "VoltSeries" },
  { id: "2", name: "AeroPhone 15 Ultra", price: 1199, category: "Mobile", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", stock: 120, description: "Titanium Silver, 256GB, Ultra-wide Camera with computational photography.", brand: "VoltSeries" },
  { id: "3", name: "Sonic Pure ANC", price: 349, category: "Audio", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80", stock: 12, description: "Studio-grade active noise cancellation with lossless audio reproduction.", brand: "QuantumTech" },
  { id: "4", name: "Nexus Air Pad", price: 1099, category: "Tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", stock: 0, description: "The thinnest tablet ever engineered with Haptic Touch and M-series silicon.", brand: "VoltSeries" },
  { id: "5", name: "VoltWatch Gen 5", price: 399, category: "Wearables", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80", stock: 89, description: "Precision health monitoring with sapphire crystal and 40-hour battery life.", brand: "VoltSeries" },
  { id: "6", name: "VisionCurve 38\"", price: 1299, category: "Displays", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", stock: 5, description: "38-inch ultrawide 4K curved display with 144Hz refresh rate, DCI-P3 color.", brand: "QuantumTech" },
];

export const useAppStore = create<AppState>((set) => ({
  products: mockProducts,
  cartItems: [],
  addToCart: (product, quantity = 1) => set((state) => {
    const existing = state.cartItems.find(item => item.id === product.id);
    if (existing) {
      return { cartItems: state.cartItems.map(item => item.id === product.id ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) } : item) };
    }
    return { cartItems: [...state.cartItems, { ...product, quantity: Math.min(product.stock, quantity) }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item => item.id === productId ? { ...item, quantity } : item)
  }))
}));

