import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Plus, Package, AlertTriangle, TrendingUp } from "lucide-react";

export function Inventory() {
  const navigate = useNavigate();
  const products = useAppStore(state => state.products);
  const fetchProducts = useAppStore(state => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 15).length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inventory Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage products, stock levels, and pricing.</p>
        </div>
        <Button onClick={() => navigate("/admin/inventory/add")} className="shrink-0 gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total SKU Items</CardTitle>
            <Package className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b border-slate-200 bg-slate-50/50">
                <tr className="border-b transition-colors hover:bg-slate-100/50">
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Product</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Category</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Price</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Stock</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Status</th>
                  <th className="h-12 px-6 align-middle font-medium text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {products.map((product) => (
                  <tr 
                    key={product.id}
                    className="border-b border-slate-200 transition-colors hover:bg-slate-50/80"
                  >
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-3">
                         <img src={product.image} className="w-10 h-10 rounded bg-slate-100 object-cover" alt="" />
                         <span className="font-bold text-slate-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-6 align-middle text-slate-500">{product.category}</td>
                    <td className="p-6 align-middle font-medium">₹{product.price}</td>
                    <td className="p-6 align-middle">
                      <span className="font-medium">{product.stock}</span> units
                    </td>
                    <td className="p-6 align-middle">
                      {product.stock === 0 ? (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">Out of Stock</span>
                      ) : product.stock < 15 ? (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">Low Stock</span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">In Stock</span>
                      )}
                    </td>
                    <td className="p-6 align-middle text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
