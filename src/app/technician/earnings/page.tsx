"use client";

import { motion } from "motion/react";
import { DollarSign, TrendingUp, Clock, Award } from "lucide-react";
import { techEarnings, monthlyEarnings } from "@/data/technician/techEarnings";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const maxMonthly = Math.max(...monthlyEarnings.map((m) => m.value));

export default function TechnicianEarningsPage() {
  const totalEarned = techEarnings.filter((e) => e.status === "paid").reduce((sum, e) => sum + e.amount, 0);
  const thisMonth = techEarnings.filter((e) => e.date.startsWith("2026-07")).reduce((sum, e) => sum + e.amount, 0);
  const pending = techEarnings.filter((e) => e.status === "pending").reduce((sum, e) => sum + e.amount, 0);
  const avgPerJob = Math.round(totalEarned / techEarnings.filter((e) => e.status === "paid").length);

  const statCards = [
    { label: "Total Earned", value: `₹${totalEarned.toLocaleString("en-IN")}`, icon: DollarSign, color: "text-green-600 bg-green-50" },
    { label: "This Month", value: `₹${thisMonth.toLocaleString("en-IN")}`, icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
    { label: "Pending Payout", value: `₹${pending.toLocaleString("en-IN")}`, icon: Clock, color: "text-amber-600 bg-amber-50" },
    { label: "Avg Per Job", value: `₹${avgPerJob}`, icon: Award, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Earnings</h1>
        <p className="text-muted-foreground">Track your earnings and payments</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <div className={`flex size-9 items-center justify-center rounded-lg ${card.color}`}><card.icon className="size-5" /></div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Chart */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-4 font-semibold text-foreground">Monthly Earnings</h3>
        <div className="flex items-end gap-3" style={{ height: 140 }}>
          {monthlyEarnings.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-[10px] text-muted-foreground">₹{(m.value / 1000).toFixed(1)}k</span>
              <div className="w-full rounded-t-md bg-green-500/80 transition-all" style={{ height: `${(m.value / maxMonthly) * 110}px` }} />
              <span className="mt-1 text-[10px] text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Earnings Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card">
        <div className="p-4">
          <h3 className="font-semibold text-foreground">Earnings History</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {techEarnings.map((earning, i) => (
              <motion.tr key={earning.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                <TableCell className="font-medium">{earning.jobId}</TableCell>
                <TableCell>{earning.serviceName}</TableCell>
                <TableCell>{earning.customerName}</TableCell>
                <TableCell>{new Date(earning.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</TableCell>
                <TableCell><StatusBadge status={earning.status} /></TableCell>
                <TableCell className="text-right font-medium">₹{earning.amount}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
