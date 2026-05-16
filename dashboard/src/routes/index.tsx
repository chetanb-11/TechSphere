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
import { ErrorBoundary } from "../components/ErrorBoundary";

import { Customers } from "../pages/Customers";
import { Orders } from "../pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "catalog", element: <Catalog /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "inventory", element: <Inventory /> },
      { path: "orders", element: <Orders /> },
      { path: "customers", element: <Customers /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
