"use client";

import { useState } from "react";
import {
    BarChart3, Users, DollarSign, TrendingUp, Bell, Search, Menu, Settings,
    ChevronDown, ArrowUpRight, ArrowDownRight, MoreHorizontal, Activity,
    Calendar, Clock, Globe, Zap, Shield, FileText
} from "lucide-react";

const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: Users, label: "Customers" },
    { icon: DollarSign, label: "Revenue" },
    { icon: Activity, label: "Analytics" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
];

const metrics = [
    { label: "Total Revenue", value: "$48,250", change: "+12.5%", up: true, icon: DollarSign, color: "from-emerald-500  to-teal-600" },
    { label: "Active Users", value: "12,847", change: "+8.2%", up: true, icon: Users, color: "from-blue-500 to-indigo-600" },
    { label: "Conversion Rate", value: "3.24%", change: "-0.4%", up: false, icon: TrendingUp, color: "from-violet-500 to-purple-600" },
    { label: "Avg. Session", value: "4m 32s", change: "+15.3%", up: true, icon: Clock, color: "from-amber-500 to-orange-600" },
];

const recentActivity = [
    { user: "Sarah Johnson", action: "Upgraded to Pro plan", time: "2 min ago", amount: "+$49/mo" },
    { user: "Alex Chen", action: "New subscription", time: "15 min ago", amount: "+$29/mo" },
    { user: "Maria Garcia", action: "Cancelled subscription", time: "1 hr ago", amount: "-$29/mo" },
    { user: "James Wilson", action: "Upgraded to Enterprise", time: "2 hr ago", amount: "+$199/mo" },
    { user: "Emily Davis", action: "New subscription", time: "3 hr ago", amount: "+$49/mo" },
];

const topProducts = [
    { name: "Pro Plan", revenue: "$24,500", users: 580, growth: 12, barWidth: "85%" },
    { name: "Starter Plan", revenue: "$12,200", users: 1240, growth: 8, barWidth: "55%" },
    { name: "Enterprise", revenue: "$9,800", users: 42, growth: 24, barWidth: "40%" },
    { name: "Add-ons", revenue: "$1,750", users: 310, growth: -3, barWidth: "15%" },
];

export default function SaasDashboardDemo() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0f1117] text-white font-sans flex overflow-x-hidden">
            {/* Sidebar */}
            <aside className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#13141b] border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap size={18} className="text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-lg tracking-tight">Pulse</span>
                            <span className="text-indigo-400 text-lg">.</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${item.active
                                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                    : "text-gray-500 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">admin@pulse.io</p>
                        </div>
                        <ChevronDown size={14} className="text-gray-500" />
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-20 bg-[#0f1117]/80 backdrop-blur-lg border-b border-white/5 px-6 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                        </button>
                        <div className="relative hidden md:block">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="w-72 pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm outline-none focus:border-indigo-500/50 transition-colors placeholder-gray-600"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                            All Systems Online
                        </div>
                        <button className="relative p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                            <Bell size={18} className="text-gray-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="hidden md:inline text-gray-400">Mar 10, 2026</span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-6 md:p-8 space-y-8">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-gray-500 text-sm mt-1">Welcome back, John. Here&apos;s your business overview.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                                <Globe size={16} /> This Month <ChevronDown size={14} />
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
                                <Shield size={16} /> Generate Report
                            </button>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {metrics.map((metric, i) => (
                            <div key={i} className="bg-[#13141b] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
                                        <metric.icon size={20} className="text-white" />
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal size={18} className="text-gray-600" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-bold tracking-tight">{metric.value}</span>
                                    <span className={`flex items-center gap-1 text-xs font-semibold ${metric.up ? "text-emerald-400" : "text-red-400"}`}>
                                        {metric.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                        {metric.change}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts & Activity Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Revenue Chart Placeholder */}
                        <div className="lg:col-span-2 bg-[#13141b] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="font-bold text-lg">Revenue Overview</h3>
                                    <p className="text-gray-500 text-sm">Monthly recurring revenue</p>
                                </div>
                                <div className="flex bg-white/5 rounded-lg p-1 text-xs font-medium">
                                    <button className="px-3 py-1.5 bg-indigo-500/20 text-indigo-400 rounded-md">Monthly</button>
                                    <button className="px-3 py-1.5 text-gray-500 hover:text-white transition-colors">Yearly</button>
                                </div>
                            </div>

                            {/* Simulated bar chart */}
                            <div className="flex items-end gap-3 h-48">
                                {[35, 55, 45, 70, 60, 85, 75, 90, 65, 80, 70, 95].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400 hover:from-indigo-500 hover:to-violet-400 transition-all duration-300 cursor-pointer relative group"
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                ${(h * 530).toLocaleString()}
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-600">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-[#13141b] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg">Recent Activity</h3>
                                <button className="text-xs text-indigo-400 font-medium hover:text-indigo-300 transition-colors">View All</button>
                            </div>

                            <div className="space-y-5">
                                {recentActivity.map((activity, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0 mt-0.5">
                                            {activity.user.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{activity.user}</p>
                                            <p className="text-xs text-gray-500">{activity.action}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className={`text-sm font-semibold ${activity.amount.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                                                {activity.amount}
                                            </p>
                                            <p className="text-[10px] text-gray-600">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-[#13141b] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-lg">Top Products</h3>
                                <p className="text-gray-500 text-sm">Performance breakdown by plan</p>
                            </div>
                            <button className="text-xs text-indigo-400 font-medium hover:text-indigo-300 transition-colors">Export</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                                        <th className="pb-4 pr-6 font-semibold">Product</th>
                                        <th className="pb-4 pr-6 font-semibold">Revenue</th>
                                        <th className="pb-4 pr-6 font-semibold">Users</th>
                                        <th className="pb-4 pr-6 font-semibold">Growth</th>
                                        <th className="pb-4 font-semibold w-1/4">Performance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {topProducts.map((product, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 pr-6 font-medium">{product.name}</td>
                                            <td className="py-4 pr-6 text-gray-400">{product.revenue}</td>
                                            <td className="py-4 pr-6 text-gray-400">{product.users.toLocaleString()}</td>
                                            <td className="py-4 pr-6">
                                                <span className={`flex items-center gap-1 text-xs font-semibold ${product.growth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                                    {product.growth >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                    {Math.abs(product.growth)}%
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div className="w-full bg-white/5 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500" style={{ width: product.barWidth }}></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
