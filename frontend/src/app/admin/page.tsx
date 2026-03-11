"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProjects, fetchAcademicPapers, fetchTemplates, apiClient } from "@/lib/api";
import { FolderKanban, BookOpen, LayoutTemplate, TrendingUp, CreditCard, DollarSign } from "lucide-react";
import type { PaymentResponse } from "@/types";

const fetchPayments = async (): Promise<PaymentResponse[]> =>
  (await apiClient.get("/payments/admin")).data;

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(amount);

export default function AdminDashboard() {
  const { data: projects } = useQuery({ queryKey: ["adminProjects"], queryFn: fetchProjects });
  const { data: papers } = useQuery({ queryKey: ["adminPapers"], queryFn: fetchAcademicPapers });
  const { data: templates } = useQuery({ queryKey: ["adminTemplates"], queryFn: fetchTemplates });
  const { data: payments } = useQuery({ queryKey: ["adminPayments"], queryFn: fetchPayments });

  const totalInquiries = templates?.reduce((sum, t) => sum + (t.inquiryCount || 0), 0) || 0;
  const totalRevenue = (payments || []).filter(p => p.status === "SUCCESS").reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    { label: "Projects", value: projects?.length ?? "—", icon: FolderKanban, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Publications", value: papers?.length ?? "—", icon: BookOpen, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Templates", value: templates?.length ?? "—", icon: LayoutTemplate, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Inquiries", value: totalInquiries, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Payments", value: payments?.length ?? "—", icon: CreditCard, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { label: "Revenue", value: formatPrice(totalRevenue), icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-jakarta font-bold text-white mb-2">Dashboard</h1>
        <p className="text-primary-muted">Overview of your portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="glass-panel p-8 text-center text-primary-muted">
        <p className="text-lg">Use the sidebar to manage your Projects, Academic Papers, Templates, and Payments.</p>
      </div>
    </div>
  );
}
