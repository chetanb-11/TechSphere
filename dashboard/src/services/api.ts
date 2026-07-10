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

const getAuthHeaders = () => {
  const userStr = localStorage.getItem("techsphere_user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.token) {
        return { 'Authorization': `Bearer ${user.token}` };
      }
    } catch (e) {
      console.error("Failed to parse user from local storage", e);
    }
  }
  return {};
};

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
      new: item.new || false,
    }));
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/products/search/${query}`);
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
      new: item.new || false,
    }));
  },

  getOrdersById: async (userId: string): Promise<any[]> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/orders/${userId}`, {
      headers: {...getAuthHeaders()}
    });
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  getOrders: async (): Promise<any[]> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/orders`, {
      headers: {...getAuthHeaders()}
    });
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  createOrder: async (userId: string, orderData: any): Promise<any> =>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/orders/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders()
      },
      body: JSON.stringify(orderData)
    });
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  getCartItems: async (userId: string): Promise<CartItem[]> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/cart?userId=${userId}`, {
      headers: { ...getAuthHeaders() }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      id: item._id || item.id,
      productId: item.productId || item._id || item.id,
      quantity: item.quantity,
    }));
  },
  addToCart: async (productId: string, userId: string): Promise<void> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/cart/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ userId })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
  removeFromCart: async (cartItemId: string, userId: string): Promise<void> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/cart/removecartitem/${cartItemId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ userId })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
  updateCartQuantity: async (cartItemId: string, userId: string, quantity: number): Promise<void> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/cart/${cartItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ userId, quantity })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
  getUsers: async (): Promise<User[]> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/auth/user`, {
      headers: { ...getAuthHeaders() }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((u: any) => ({
      id: u._id || u.id,
      name: u.email.split('@')[0],
      email: u.email,
      role: u.role || "user"
    }));
  },
  createProduct: async (productData: Omit<Product, 'id' | 'clickedToday' | 'clickedWeek' | 'new'>, user?: { email?: string; role?: string }): Promise<Product> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
    const response = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders()
      },
      body: JSON.stringify({
        ...productData,
        title: productData.name,
        email: user?.email || "",
        new: true,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const item = await response.json();
    return {
      id: item._id || item.id,
      name: item.title || item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      stock: item.stock,
      description: item.description,
      brand: item.brand,
      clickedToday: 0,
      clickedWeek: 0,
      new: item.new || false,
    };
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
