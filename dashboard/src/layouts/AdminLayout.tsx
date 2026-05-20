import { Outlet, NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import { cn } from "../utils/cn";

export function AdminLayout() {
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inventory", href: "/admin/inventory", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-100 bg-white hidden md:block">
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-6 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                TechSphere <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-1">Admin</span>
              </span>
            </Link>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Main Menu</div>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="p-4 border-t border-slate-100">
             <button className="flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-full text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
               <LogOut className="h-4 w-4" />
               Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center px-6 border-b border-slate-100 bg-white md:hidden">
          <Link to="/" className="flex items-center gap-2 mr-auto">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              <Package className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-slate-900">TechSphere Admin</span>
          </Link>
        </header>
        
        <div className="flex-1 overflow-auto bg-slate-50 p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
