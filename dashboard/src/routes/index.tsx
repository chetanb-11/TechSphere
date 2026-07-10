import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StoreLayout } from "../layouts/StoreLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { Dashboard } from "../pages/Dashboard";
import { Inventory } from "../pages/Inventory";
import { Settings } from "../pages/Settings";
import { Home } from "../pages/Home";
import { Catalog } from "../pages/Catalog";
import { Cart } from "../pages/Cart";
import { ProductDetail } from "../pages/ProductDetail";
import { Checkout } from "../pages/Checkout";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

import { Customers } from "../pages/Customers";
import { Orders } from "../pages/Orders";
import { AddProduct } from "../pages/AddProduct";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/",
    element: <StoreLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "catalog", element: <Catalog /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "orders", element: <Orders /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "inventory", element: <Inventory /> },
      { path: "inventory/add", element: <AddProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "customers", element: <Customers /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

