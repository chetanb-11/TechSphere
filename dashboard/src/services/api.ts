import { CartItem, Product } from "../store/useAppStore";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { id: "3", name: "Charlie Davis", email: "charlie@example.com", role: "Viewer" },
];

export const apiService = {
  getProducts: async (): Promise<Product[]> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((item: any) => ({
      id: item._id || item.id,
      name: item.title || item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      stock: item.stock,
      description: item.description,
      brand: item.brand,
      clickedToday: item.clickedToday || 0,
      clickedWeek: item.clickedWeek || 0,
    }));
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/search/${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((item: any) => ({
      id: item._id || item.id,
      name: item.title || item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      stock: item.stock,
      description: item.description,
      brand: item.brand,
      clickedToday: item.clickedToday || 0,
      clickedWeek: item.clickedWeek || 0,
    }));
  },
  getCartItems: async (userId: string): Promise<CartItem[]> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      id: item._id || item.id,
      quantity: item.quantity,
    }));
  },
  addToCart: async (productId: string, userId: string): Promise<void> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/cart/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
  removeFromCart: async (productId: string, userId: string): Promise<void> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/cart/removecartitem/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 500));
  },
  getStats: async () => {
    return new Promise((resolve) => 
      setTimeout(() => 
        resolve({
          totalUsers: 1234,
          activeSessions: 42,
          revenue: "₹12,345",
        }),
      500)
    );
  }
};
