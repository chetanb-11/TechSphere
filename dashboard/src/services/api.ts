// Mock API Service
// In a real app, you would use axios here and read from import.meta.env.VITE_API_URL

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

export const mockApiService = {
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 500));
  },
  getStats: async () => {
    return new Promise((resolve) => 
      setTimeout(() => 
        resolve({
          totalUsers: 1234,
          activeSessions: 42,
          revenue: "$12,345",
        }),
      500)
    );
  }
};
