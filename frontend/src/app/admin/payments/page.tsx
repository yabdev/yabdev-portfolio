"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { getServicePrices, saveServicePrices, defaultPrices, type ServicePricing } from "@/lib/pricing";
import type { PaymentResponse } from "@/types";
import {
    CreditCard, Search, Download, CheckCircle, XCircle, Clock,
    ArrowUpDown, DollarSign, TrendingUp, Save, RotateCcw, Settings
} from "lucide-react";

const fetchPayments = async (): Promise<PaymentResponse[]> =>
    (await apiClient.get("/payments/admin")).data;

const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(amount);

const StatusBadge = ({ status }: { status: string }) => {
    const config: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
        SUCCESS: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
        PENDING: { icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
        FAILED: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
    };
    const c = config[status] || config.PENDING;
    const Icon = c.icon;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.bg} ${c.color}`}>
            <Icon size={12} /> {status}
        </span>
    );
};

export default function AdminPaymentsPage() {
    const { data: payments, isLoading } = useQuery({ queryKey: ["adminPayments"], queryFn: fetchPayments });
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [activeTab, setActiveTab] = useState<"payments" | "pricing">("payments");

    // Pricing state
    const [prices, setPrices] = useState<ServicePricing[]>([]);
    const [priceSaved, setPriceSaved] = useState(false);

    useEffect(() => {
        setPrices(getServicePrices());
    }, []);

    const handlePriceChange = (index: number, newPrice: string) => {
        const updated = [...prices];
        updated[index] = { ...updated[index], price: parseInt(newPrice) || 0 };
        setPrices(updated);
        setPriceSaved(false);
    };

    const savePrices = () => {
        saveServicePrices(prices);
        setPriceSaved(true);
        setTimeout(() => setPriceSaved(false), 3000);
    };

    const resetPrices = () => {
        setPrices([...defaultPrices]);
        saveServicePrices([...defaultPrices]);
        setPriceSaved(true);
        setTimeout(() => setPriceSaved(false), 3000);
    };

    const filtered = (payments || [])
        .filter(p => statusFilter === "ALL" || p.status === statusFilter)
        .filter(p =>
            p.customerName?.toLowerCase().includes(search.toLowerCase()) ||
            p.email.toLowerCase().includes(search.toLowerCase()) ||
            p.serviceName.toLowerCase().includes(search.toLowerCase()) ||
            p.reference.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

    const totalRevenue = (payments || []).filter(p => p.status === "SUCCESS").reduce((sum, p) => sum + p.amount, 0);
    const successCount = (payments || []).filter(p => p.status === "SUCCESS").length;
    const pendingCount = (payments || []).filter(p => p.status === "PENDING").length;

    const stats = [
        { label: "Total Revenue", value: formatPrice(totalRevenue), icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10" },
        { label: "Total Payments", value: payments?.length ?? 0, icon: CreditCard, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Successful", value: successCount, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { label: "Pending", value: pendingCount, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
    ];

    const exportCSV = () => {
        const header = "Reference,Customer,Email,Service,Amount,Status,Date\n";
        const rows = filtered.map(p =>
            `${p.reference},"${p.customerName}",${p.email},"${p.serviceName}",${p.amount},${p.status},${new Date(p.createdAt).toLocaleDateString()}`
        ).join("\n");
        const blob = new Blob([header + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `payments-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-jakarta font-bold text-white">Payments</h1>
                    <p className="text-primary-muted text-sm mt-1">Track payments and manage service pricing.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/5 rounded-lg p-1 w-fit">
                <button
                    onClick={() => setActiveTab("payments")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === "payments"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    <CreditCard size={16} /> Transactions
                </button>
                <button
                    onClick={() => setActiveTab("pricing")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === "pricing"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    <Settings size={16} /> Pricing
                </button>
            </div>

            {activeTab === "payments" && (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="glass-panel p-6 flex flex-col gap-4 hover:border-white/15 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</span>
                                        <div className={`p-2 rounded-lg ${stat.bg}`}>
                                            <Icon size={18} className={stat.color} />
                                        </div>
                                    </div>
                                    <span className="text-3xl font-jakarta font-bold text-white">{stat.value}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by name, email, reference, or service..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-border rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 text-sm"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="bg-black/50 border border-border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer"
                        >
                            <option value="ALL">All Status</option>
                            <option value="SUCCESS">Success</option>
                            <option value="PENDING">Pending</option>
                            <option value="FAILED">Failed</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
                            className="flex items-center gap-2 bg-black/50 border border-border rounded-lg px-4 py-2.5 text-gray-400 hover:text-white text-sm transition-colors"
                        >
                            <ArrowUpDown size={16} /> {sortOrder === "newest" ? "Newest" : "Oldest"}
                        </button>
                        <button
                            onClick={exportCSV}
                            disabled={!filtered.length}
                            className="flex items-center gap-2 bg-black/50 border border-border rounded-lg px-4 py-2.5 text-gray-400 hover:text-white text-sm transition-colors disabled:opacity-40"
                        >
                            <Download size={16} /> Export
                        </button>
                    </div>

                    {/* Table */}
                    <div className="glass-panel overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border bg-white/5">
                                        <th className="p-4 text-sm font-semibold text-gray-400">Reference</th>
                                        <th className="p-4 text-sm font-semibold text-gray-400">Customer</th>
                                        <th className="p-4 text-sm font-semibold text-gray-400">Service</th>
                                        <th className="p-4 text-sm font-semibold text-gray-400">Amount</th>
                                        <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                                        <th className="p-4 text-sm font-semibold text-gray-400">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading payments...</td></tr>
                                    ) : filtered.length === 0 ? (
                                        <tr><td colSpan={6} className="p-8 text-center text-gray-500">
                                            {payments?.length ? "No payments match your filters." : "No payments yet."}
                                        </td></tr>
                                    ) : (
                                        filtered.map((p) => (
                                            <tr key={p.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                                                <td className="p-4 font-mono text-xs text-blue-400">{p.reference}</td>
                                                <td className="p-4">
                                                    <div className="text-sm text-gray-200 font-medium">{p.customerName || "—"}</div>
                                                    <div className="text-xs text-gray-500">{p.email}</div>
                                                </td>
                                                <td className="p-4 text-sm text-gray-300">{p.serviceName}</td>
                                                <td className="p-4 text-sm text-white font-semibold">{formatPrice(p.amount)}</td>
                                                <td className="p-4"><StatusBadge status={p.status} /></td>
                                                <td className="p-4 text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {filtered.length > 0 && (
                        <p className="text-xs text-gray-600 text-right">Showing {filtered.length} of {payments?.length} payments</p>
                    )}
                </>
            )}

            {activeTab === "pricing" && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <p className="text-primary-muted text-sm">
                            Adjust service prices below. Changes are reflected on the <span className="text-blue-400">Services</span> page immediately.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={resetPrices}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-sm font-medium transition-colors border border-border"
                            >
                                <RotateCcw size={14} /> Reset to Defaults
                            </button>
                            <button
                                onClick={savePrices}
                                className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
                            >
                                <Save size={14} /> {priceSaved ? "Saved ✓" : "Save Prices"}
                            </button>
                        </div>
                    </div>

                    <div className="glass-panel overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-white/5">
                                    <th className="p-4 text-sm font-semibold text-gray-400">Service</th>
                                    <th className="p-4 text-sm font-semibold text-gray-400 w-64">Price (₦)</th>
                                    <th className="p-4 text-sm font-semibold text-gray-400 text-right">Display</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prices.map((service, i) => (
                                    <tr key={service.name} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-sm text-gray-200 font-medium">{service.name}</td>
                                        <td className="p-4">
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₦</span>
                                                <input
                                                    type="number"
                                                    value={service.price}
                                                    onChange={e => handlePriceChange(i, e.target.value)}
                                                    min="0"
                                                    className="w-full pl-8 pr-4 py-2 bg-black/50 border border-border rounded-lg text-white focus:outline-none focus:border-blue-500/50 text-sm"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 text-right text-sm text-green-400 font-semibold">{formatPrice(service.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {priceSaved && (
                        <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
                            <CheckCircle size={16} /> Prices saved successfully. Changes are live on the Services page.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
