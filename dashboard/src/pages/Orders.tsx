import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Eye, MoreHorizontal, Truck, Clock, CheckCircle2, XCircle, Package } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { apiService } from "../services/api";



const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "Delivered": { icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-100" },
  "Processing": { icon: Clock, color: "text-blue-700", bg: "bg-blue-50 border-blue-100" },
  "Pending": { icon: Clock, color: "text-slate-700", bg: "bg-slate-50 border-slate-100" },
  "Shipped": { icon: Truck, color: "text-amber-700", bg: "bg-amber-50 border-amber-100" },
  "Cancelled": { icon: XCircle, color: "text-red-700", bg: "bg-red-50 border-red-100" },
};

export function Orders() {

  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.userId) return;
      try {
        const data = user.role === "admin"
          ? await apiService.getOrders()
          : await apiService.getOrdersById(user.userId);
        const mappedOrders = data.map((order: any) => {
          let status = "Processing";
          if (order.fulfillmentStatus) {
            status = order.fulfillmentStatus.charAt(0).toUpperCase() + order.fulfillmentStatus.slice(1);
          } else if (order.paymentStatus === "paid") {
            status = "Processing";
          }

          return {
            id: order._id ? `TS-${order._id.substring(18).toUpperCase()}` : `TS-${Math.floor(Math.random() * 10000)}`,
            customer: order.customerName || "Customer",
            email: order.customerEmail || "No email",
            date: order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }) : "N/A",
            items: order.items?.length || 0,
            total: `₹${Number(order.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            status: status,
            payment: order.stripePaymentIntentId ? "Stripe" : "Credit Card"
          };
        });
        setOrders(mappedOrders);
      } catch (err: any) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === "All" || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const orderStats = [
    { label: "Total Orders", value: String(orders.length), icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Processing", value: String(orders.filter(order => order.status === "Processing").length), icon: Clock, color: "bg-amber-50 text-amber-600" },
    { label: "Shipped", value: String(orders.filter(order => order.status === "Shipped").length), icon: Truck, color: "bg-violet-50 text-violet-600" },
    { label: "Delivered", value: String(orders.filter(order => order.status === "Delivered").length), icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Orders</h1>
        <p className="text-slate-500 mt-1">Track and manage customer orders across your store.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === f
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none w-full sm:w-60"
            />
          </div>
        </div>

        {/* Table */}
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-100 bg-slate-50/50">
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Order</th>
                {user?.role === "admin" && (
                  <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Customer</th>
                )}
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Payment</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Amount</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                {user?.role === "admin" && (
                  <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const cfg = statusConfig[order.status] || statusConfig["Processing"];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={order.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{order.id}</td>
                    {user?.role === "admin" && (
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-slate-900">{order.customer}</p>
                          <p className="text-xs text-slate-400">{order.email}</p>
                        </div>
                      </td>
                    )}
                    <td className="py-4 px-6 text-slate-500 hidden md:table-cell">{order.date}</td>
                    <td className="py-4 px-6 text-slate-500 hidden lg:table-cell">{order.payment}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{order.total}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                        <StatusIcon className="w-3 h-3" />{order.status}
                      </span>
                    </td>
                    {user?.role === "admin" && (
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={user?.role === "admin" ? 7 : 5} className="py-12 text-center text-slate-400 font-medium">
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
