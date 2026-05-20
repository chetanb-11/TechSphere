import { useState } from "react";
import { Save, User, Mail, Globe, Key, Bell, Shield, CreditCard, Store } from "lucide-react";

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "store", label: "Store", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences and store configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <nav className="lg:w-56 shrink-0 flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Profile Information</h2>
                <p className="text-sm text-slate-500 mt-1">Update your personal details and contact information.</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
                    AU
                  </div>
                  <div>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG or SVG. Max 1MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">First Name</label>
                    <input
                      type="text"
                      defaultValue="Admin"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Last Name</label>
                    <input
                      type="text"
                      defaultValue="User"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@techsphere.com"
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" /> Timezone
                  </label>
                  <select className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none appearance-none">
                    <option>Asia/Kolkata (IST, UTC+5:30)</option>
                    <option>America/New_York (EST, UTC-5)</option>
                    <option>Europe/London (GMT, UTC+0)</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end">
                <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "store" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Store Configuration</h2>
                <p className="text-sm text-slate-500 mt-1">Manage how your store connects to services.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" /> API Endpoint
                  </label>
                  <input
                    type="text"
                    value="https://tech-sphere-backend.vercel.app/api"
                    disabled
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400">Configured via environment variables. Restart server to change.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Store Name</label>
                  <input
                    type="text"
                    defaultValue="TechSphere"
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Currency</label>
                  <select className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none appearance-none">
                    <option>₹ INR — Indian Rupee</option>
                    <option>$ USD — US Dollar</option>
                    <option>€ EUR — Euro</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end">
                <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
                <p className="text-sm text-slate-500 mt-1">Choose what updates you'd like to receive.</p>
              </div>
              <div className="p-6 space-y-5">
                {[
                  { label: "New Orders", desc: "Get notified when a customer places an order.", enabled: true },
                  { label: "Low Stock Alerts", desc: "Receive alerts when products fall below threshold.", enabled: true },
                  { label: "Customer Reviews", desc: "Notifications for new product reviews.", enabled: false },
                  { label: "Weekly Reports", desc: "Receive a weekly analytics summary via email.", enabled: true },
                  { label: "Marketing Updates", desc: "Tips and feature updates from TechSphere.", enabled: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-10 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 after:shadow-sm"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Security Settings</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your password and authentication methods.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Key className="w-3.5 h-3.5" /> Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">Two-Factor Authentication</p>
                    <p className="text-xs text-emerald-600 mt-0.5">Add an extra layer of security to your account.</p>
                    <button className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full hover:bg-emerald-200 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end">
                <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                  <Save className="w-4 h-4" /> Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Billing & Payments</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your subscription and payment methods.</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Current Plan */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">Current Plan</span>
                    <span className="text-sm font-bold text-slate-900">₹999/mo</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">TechSphere Pro</h3>
                  <p className="text-sm text-slate-500">Unlimited products, advanced analytics, priority support.</p>
                  <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Upgrade Plan →
                  </button>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Payment Method</h3>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-12 h-8 rounded-md bg-slate-900 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">•••• •••• •••• 4242</p>
                      <p className="text-xs text-slate-400">Expires 12/2027</p>
                    </div>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
