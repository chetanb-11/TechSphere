import { useState } from "react";
import { Search, Filter, ChevronDown, Eye, MoreHorizontal, Truck, Clock, CheckCircle2, XCircle, Package } from "lucide-react";

const allOrders = [
  { id: "TS-9001", customer: "Ankit Sharma", email: "ankit@email.com", date: "May 19, 2026", items: 3, total: "₹12,340", status: "Delivered", payment: "Credit Card" },
  { id: "TS-9000", customer: "Priya Patel", email: "priya@email.com", date: "May 19, 2026", items: 1, total: "₹8,550", status: "Processing", payment: "UPI" },
  { id: "TS-8999", customer: "Rahul Verma", email: "rahul@email.com", date: "May 18, 2026", items: 2, total: "₹3,200", status: "Shipped", payment: "Debit Card" },
  { id: "TS-8998", customer: "Sneha Gupta", email: "sneha@email.com", date: "May 18, 2026", items: 5, total: "₹15,690", status: "Delivered", payment: "Credit Card" },
  { id: "TS-8997", customer: "Vikash Kumar", email: "vikash@email.com", date: "May 17, 2026", items: 1, total: "₹6,870", status: "Cancelled", payment: "UPI" },
  { id: "TS-8996", customer: "Neha Singh", email: "neha@email.com", date: "May 17, 2026", items: 4, total: "₹22,100", status: "Shipped", payment: "Net Banking" },
  { id: "TS-8995", customer: "Amit Joshi", email: "amit@email.com", date: "May 16, 2026", items: 2, total: "₹9,450", status: "Processing", payment: "Credit Card" },
  { id: "TS-8994", customer: "Kavita Rao", email: "kavita@email.com", date: "May 16, 2026", items: 1, total: "₹4,320", status: "Delivered", payment: "UPI" },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "Delivered": { icon: CheckCircle2, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-100" },
  "Processing": { icon: Clock, color: "text-blue-700", bg: "bg-blue-50 border-blue-100" },
  "Shipped": { icon: Truck, color: "text-amber-700", bg: "bg-amber-50 border-amber-100" },
  "Cancelled": { icon: XCircle, color: "text-red-700", bg: "bg-red-50 border-red-100" },
};

export function Orders() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = allOrders.filter(order => {
    const matchesFilter = filter === "All" || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const orderStats = [
    { label: "Total Orders", value: "1,284", icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Processing", value: "42", icon: Clock, color: "bg-amber-50 text-amber-600" },
    { label: "Shipped", value: "18", icon: Truck, color: "bg-violet-50 text-violet-600" },
    { label: "Delivered", value: "1,198", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="space-y-8">
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === f
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
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Customer</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Payment</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Amount</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const cfg = statusConfig[order.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={order.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{order.id}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-slate-900">{order.customer}</p>
                        <p className="text-xs text-slate-400">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 hidden md:table-cell">{order.date}</td>
                    <td className="py-4 px-6 text-slate-500 hidden lg:table-cell">{order.payment}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{order.total}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                        <StatusIcon className="w-3 h-3" />{order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
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
