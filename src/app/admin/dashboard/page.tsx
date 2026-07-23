"use client";

import { motion } from "motion/react";
import { Users, CalendarCheck, IndianRupee, Wrench, ArrowUpRight, Clock, UserPlus, Star } from "lucide-react";
import { dashboardStats, recentActivity, monthlyRevenue } from "@/data/admin/dashboard";

const statCards = [
  { label: "Total Customers", value: dashboardStats.totalCustomers, icon: Users, color: "text-blue-600 bg-blue-50", change: `+${dashboardStats.newCustomersThisMonth} this month` },
  { label: "Active Bookings", value: dashboardStats.activeBookings, icon: CalendarCheck, color: "text-green-600 bg-green-50", change: `${dashboardStats.completedThisMonth} completed` },
  { label: "Total Revenue", value: `₹${(dashboardStats.totalRevenue).toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-purple-600 bg-purple-50", change: `${dashboardStats.pendingPayments} pending` },
  { label: "Active Technicians", value: dashboardStats.activeTechnicians, icon: Wrench, color: "text-amber-600 bg-amber-50", change: `Avg rating ${dashboardStats.avgRating}` },
];

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  booking: CalendarCheck,
  payment: IndianRupee,
  signup: UserPlus,
  review: Star,
};

const activityColors: Record<string, string> = {
  booking: "bg-blue-50 text-blue-600",
  payment: "bg-green-50 text-green-600",
  signup: "bg-purple-50 text-purple-600",
  review: "bg-amber-50 text-amber-600",
};

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <div className={`flex size-9 items-center justify-center rounded-lg ${card.color}`}>
                <card.icon className="size-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{card.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{card.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="self-start rounded-xl border border-border bg-card p-4"
        >
          <h3 className="mb-4 font-semibold text-foreground">Monthly Revenue</h3>
          <div className="flex items-end gap-2" style={{ height: 140 }}>
            {monthlyRevenue.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center justify-end">
                <span className="mb-1 text-[10px] text-muted-foreground">₹{(m.value / 1000).toFixed(0)}k</span>
                <div
                  className="w-full rounded-t-md bg-primary/80 transition-all"
                  style={{ height: `${(m.value / maxRevenue) * 120}px` }}
                />
                <span className="mt-1 text-[10px] text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <Clock className="size-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {recentActivity.slice(0, 8).map((activity) => {
              const Icon = activityIcons[activity.type] || CalendarCheck;
              const color = activityColors[activity.type] || "bg-gray-50 text-gray-600";
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${color}`}>
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.userName} &middot; {activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-border bg-card p-4"
      >
        <h3 className="mb-4 font-semibold text-foreground">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/customers" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Users className="size-4" />
            Manage Customers
            <ArrowUpRight className="size-3 text-muted-foreground" />
          </a>
          <a href="/admin/bookings" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <CalendarCheck className="size-4" />
            Manage Bookings
            <ArrowUpRight className="size-3 text-muted-foreground" />
          </a>
          <a href="/admin/technicians" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Wrench className="size-4" />
            Manage Technicians
            <ArrowUpRight className="size-3 text-muted-foreground" />
          </a>
          <a href="/admin/services" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Manage Services
            <ArrowUpRight className="size-3 text-muted-foreground" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
