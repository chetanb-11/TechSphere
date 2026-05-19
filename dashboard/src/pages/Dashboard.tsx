import { useAppStore } from "../store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Activity, DollarSign, Users, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const products = useAppStore(state => state.products);
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock < 15);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-green-500 font-medium mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Sales</CardTitle>
            <Activity className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-green-500 font-medium mt-1">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-green-500 font-medium mt-1">+201 since last hour</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockProducts.length + lowStockProducts.length}</div>
            <p className="text-xs text-red-500 font-medium mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
          <Card>
             <CardHeader>
               <CardTitle>Recent Orders</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium text-sm text-slate-900">Order #VOLT-{(8942 - i).toString()}</div>
                        <div className="text-xs text-slate-500">Processing • Credit Card</div>
                      </div>
                      <div className="font-bold text-sm">₹{(Math.random() * 500 + 100).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
             </CardContent>
          </Card>
          
          <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle>Stock Action Required</CardTitle>
               <Link to="/admin/inventory" className="text-sm text-blue-600 font-medium hover:underline">View All</Link>
             </CardHeader>
             <CardContent>
                <div className="space-y-4">
                  {outOfStockProducts.map(p => (
                    <div key={p.id} className="flex items-center justify-between">
                       <span className="text-sm font-medium text-slate-900">{p.name}</span>
                       <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Out of Stock</span>
                    </div>
                  ))}
                  {lowStockProducts.map(p => (
                    <div key={p.id} className="flex items-center justify-between">
                       <span className="text-sm font-medium text-slate-900">{p.name}</span>
                       <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">Only {p.stock} left</span>
                    </div>
                  ))}
                </div>
             </CardContent>
          </Card>
      </div>
    </div>
  );
}
