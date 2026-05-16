# Frontend - Backend Collaboration Guide

Welcome! This document outlines the architecture, data models, state management, and the specific integration points required to seamlessly connect this React frontend to a real backend.

## Tech Stack
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Application Structure

The application is split into two distinct sub-systems:
1. **Storefront (`/`)**: The customer-facing e-commerce store.
2. **Admin Console (`/admin`)**: The internal dashboard for managing inventory, orders, and settings.

### Route Map
**Storefront:**
- `/` - Home/Hero page with featured and trending products.
- `/catalog` - Product listing with category and stock filters.
- `/product/:id` - Detailed product view.
- `/cart` - Shopping cart and checkout summary.

**Admin Console (Protected/Internal):**
- `/admin` - Overview dashboard (revenue, sales, alerts).
- `/admin/inventory` - Product CRUD and stock management.
- `/admin/orders` - Order history and fulfillment.
- `/admin/customers` - User/Customer directory.
- `/admin/settings` - Admin profile and API configuration.

## Data Models

Currently, the frontend uses TypeScript interfaces. Your backend schemas should roughly align with these structures. 

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;       // URL string to product image
  stock: number;       // Current inventory count
  description: string;
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
}
```

## State Management & Mocked Data

The frontend relies on **Zustand** (`src/store/useAppStore.ts`) for global state. Currently, the store initializes with a hardcoded array of `mockProducts`. 

**Backend Goal:** We need to replace these mock arrays with actual HTTP calls to your endpoints.

## API Integration Points (To Be Built)

Here is the checklist of REST/GraphQL endpoints the frontend will eventually need from the backend:

### 1. Products & Inventory
- `GET /api/products` - Fetch all products. Should support query parameters for filtering (`?category=Audio`, `?inStock=true`).
- `GET /api/products/:id` - Fetch a single product's details.
- `POST /api/admin/products` - Create a new product.
- `PUT /api/admin/products/:id` - Update product details/stock.

### 2. Cart & Orders
- `POST /api/orders` - Process a checkout/order creation from the cart payload.
- `GET /api/admin/orders` - Fetch orders for the dashboard & orders management page.

### 3. Authentication & Users
- login/logout endpoints (JWT or Session based).
- `GET /api/admin/customers` - Fetch users for the Customers directory.

### 4. Admin Analytics
- `GET /api/admin/analytics` - Fetch dashboard stats (Total Revenue, Active Sessions, Out-of-Stock warnings, etc.).

## How to execute the Connection

1. **Environment Variables**: Add your backend URL to a `.env` file at the root.
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   ```
2. **API Service Implementation**: Inside `src/services/api.ts`, replace the current mock services with an `Axios` instance initialized using `import.meta.env.VITE_API_BASE_URL`.
3. **Zustand Actions**: Update the `useAppStore.ts` store methods (e.g., `fetchProducts`, `addToCart`) to trigger these async functions over the network, bringing real data into the `state.products` array.

## Handling Errors

The application is wrapped in a robust `<ErrorBoundary />` at the router level. To ensure smooth error handling:
- Return standardized HTTP error codes (e.g., `400` for validation, `401` for unauthorized, `404` for not found, `500` for system error).
- Optionally return a JSON payload with a descriptive `message` field. The `ErrorBoundary` will automatically catch route errors and unhandled exceptions, displaying them to the user nicely without crashing the frontend.
