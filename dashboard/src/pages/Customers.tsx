import { useState, useEffect } from "react";
import { Search, Users, UserPlus, Mail, ShoppingBag, Star, MoreHorizontal } from "lucide-react";
import { apiService } from "../services/api";

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-fuchsia-100 text-fuchsia-700",
  "bg-orange-100 text-orange-700",
];

const statusStyles: Record<string, string> = {
  "Active": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "VIP": "bg-amber-50 text-amber-700 border-amber-100",
  "New": "bg-blue-50 text-blue-700 border-blue-100",
};

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomersAndOrders = async () => {
      try {
        const [users, ordersList] = await Promise.all([
          apiService.getUsers(),
          apiService.getOrders()
        ]);
        
        const mapped = users.map((u: any) => {
          const userOrders = ordersList.filter((order: any) => order.userId === u.id);
          const totalSpent = userOrders.reduce((acc: number, order: any) => acc + (order.total || 0), 0);
          
          return {
            id: u.id,
            name: u.name || u.email.split('@')[0],
            email: u.email,
            avatar: (u.name || u.email.split('@')[0]).substring(0, 2).toUpperCase(),
            orders: userOrders.length,
            spent: `₹${Number(totalSpent).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
            joined: "Jul 2026",
            status: u.role === "admin" ? "VIP" : "Active"
          };
        });
        setCustomers(mapped);
      } catch (err: any) {
        setError(err.message || "Failed to load customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomersAndOrders();
  }, []);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpentAll = customers.reduce((acc, c) => acc + Number(c.spent.replace(/[^0-9.-]+/g,"")), 0);
  const totalOrdersAll = customers.reduce((acc, c) => acc + c.orders, 0);
  const avgOrderValue = totalOrdersAll > 0 ? totalSpentAll / totalOrdersAll : 0;

  const customerStats = [
    { label: "Total Customers", value: String(customers.length), icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "VIP Members", value: String(customers.filter(c => c.status === "VIP").length), icon: Star, color: "bg-amber-50 text-amber-600" },
    { label: "Avg. Order Value", value: `₹${Number(avgOrderValue).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, icon: ShoppingBag, color: "bg-violet-50 text-violet-600" },
    { label: "VIP Ratio", value: `${customers.length > 0 ? Math.round((customers.filter(c => c.status === "VIP").length / customers.length) * 100) : 0}%`, icon: UserPlus, color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Customers</h1>
          <p className="text-slate-500 mt-1">Manage and understand your customer base.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shrink-0">
          <Mail className="w-4 h-4" /> Send Newsletter
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {customerStats.map((stat) => (
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

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-lg text-slate-900">Customer Directory</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none w-60"
            />
          </div>
        </div>

        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-100 bg-slate-50/50">
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Customer</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Joined</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Orders</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Total Spent</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                <th className="py-3.5 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, i) => (
                <tr key={customer.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-bold`}>
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{customer.name}</p>
                        <p className="text-xs text-slate-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 hidden md:table-cell">{customer.joined}</td>
                  <td className="py-4 px-6 font-semibold text-slate-900">{customer.orders}</td>
                  <td className="py-4 px-6 font-semibold text-slate-900">{customer.spent}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[customer.status]}`}>
                      {customer.status === "VIP" && <Star className="w-3 h-3 mr-1" />}
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No customers found.
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
