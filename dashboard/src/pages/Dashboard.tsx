import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Activity, DollarSign, Users, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Package, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { apiService } from "../services/api";

export function Dashboard() {
  const products = useAppStore(state => state.products);
  const fetchProducts = useAppStore(state => state.fetchProducts);
  const [orders, setOrders] = useState<any[]>([]);
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock < 15);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  const trendingProducts = [...products].sort((a, b) => b.clickedToday - a.clickedToday).slice(0, 5);

  useEffect(() => {
    fetchProducts();
    const fetchOrders = async () => {
      try {
        const data = await apiService.getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch dashboard orders:", err);
      }
    };
    fetchOrders();
  }, [fetchProducts]);

  const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
  const today = new Date().toDateString();
  const ordersToday = orders.filter(order => order.createdAt && new Date(order.createdAt).toDateString() === today).length;

  const stats = [
    {
      title: "Total Revenue",
      value: "₹" + Number(totalRevenue).toLocaleString("en-IN", { maximumFractionDigits: 0 }),
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "blue",
    },
    {
      title: "Orders Today",
      value: String(ordersToday),
      change: "+15%",
      trend: "up",
      icon: ShoppingCart,
      color: "emerald",
    },
    {
      title: "Active Visitors",
      value: "573",
      change: "+201",
      trend: "up",
      icon: Eye,
      color: "violet",
    },
    {
      title: "Stock Alerts",
      value: String(outOfStockProducts.length + lowStockProducts.length),
      change: "Needs attention",
      trend: "down",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const colorMap: Record<string, { bg: string; iconBg: string; text: string }> = {
    blue: { bg: "bg-blue-50", iconBg: "bg-blue-100 text-blue-600", text: "text-blue-600" },
    emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100 text-emerald-600", text: "text-emerald-600" },
    violet: { bg: "bg-violet-50", iconBg: "bg-violet-100 text-violet-600", text: "text-violet-600" },
    red: { bg: "bg-red-50", iconBg: "bg-red-100 text-red-600", text: "text-red-600" },
  };

  const recentOrders = orders.slice(0, 5).map(order => {
    let status = "Processing";
    let statusColor = "bg-blue-100 text-blue-700";
    if (order.fulfillmentStatus) {
      status = order.fulfillmentStatus.charAt(0).toUpperCase() + order.fulfillmentStatus.slice(1);
    } else if (order.paymentStatus === "paid") {
      status = "Processing";
    }
    
    if (status === "Delivered") {
      statusColor = "bg-emerald-100 text-emerald-700";
    } else if (status === "Shipped") {
      statusColor = "bg-amber-100 text-amber-700";
    } else if (status === "Cancelled") {
      statusColor = "bg-red-100 text-red-700";
    }
    
    return {
      id: order._id ? `TS-${order._id.substring(18).toUpperCase()}` : `TS-${Math.floor(Math.random() * 10000)}`,
      customer: order.customerName || "Customer",
      amount: `₹${Number(order.total || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      status: status,
      statusColor: statusColor
    };
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const colors = colorMap[stat.color];
          return (
            <div key={stat.title} className={`${colors.bg} rounded-2xl p-6 border border-white/60`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.trend === "up" ? (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />{stat.change}
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full flex items-center gap-0.5">
                    <ArrowDownRight className="w-3 h-3" />{stat.change}
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Orders - 3 cols */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Link to="/admin/orders" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              View all →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-100">
                    <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Order</th>
                    <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Customer</th>
                    <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Amount</th>
                    <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-900">{order.id}</td>
                      <td className="py-4 text-slate-600">{order.customer}</td>
                      <td className="py-4 font-semibold">{order.amount}</td>
                      <td className="py-4 text-right">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Trending Products - 2 cols */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Trending Today</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingProducts.map((product, i) => (
                <div key={product.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-5 text-right">{i + 1}</span>
                  <img src={product.image} alt="" className="w-10 h-10 rounded-lg bg-slate-100 object-cover border border-slate-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-900">{product.clickedToday}</p>
                    <p className="text-xs text-slate-400">clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Out of Stock */}
        <Card className="border-red-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <CardTitle className="text-lg">Out of Stock</CardTitle>
            </div>
            <Link to="/admin/inventory" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Manage →
            </Link>
          </CardHeader>
          <CardContent>
            {outOfStockProducts.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">All products are stocked! 🎉</p>
            ) : (
              <div className="space-y-3">
                {outOfStockProducts.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl bg-red-50/50 border border-red-100/50">
                    <img src={p.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                    <span className="text-sm font-medium text-slate-900 flex-1 truncate">{p.name}</span>
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">0 units</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock */}
        <Card className="border-amber-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Package className="w-4 h-4 text-amber-600" />
              </div>
              <CardTitle className="text-lg">Low Stock</CardTitle>
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2.5 py-1 rounded-full">{lowStockProducts.length} items</span>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No low stock alerts! ✨</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl bg-amber-50/50 border border-amber-100/50">
                    <img src={p.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                    <span className="text-sm font-medium text-slate-900 flex-1 truncate">{p.name}</span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">{p.stock} left</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
