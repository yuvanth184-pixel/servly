"use client";

import { motion } from "motion/react";
import { IndianRupee, CalendarCheck, Users, Star, TrendingUp } from "lucide-react";
import { dashboardStats, monthlyRevenue, topServices, topTechnicians } from "@/data/admin/dashboard";
import { PageHeader } from "@/components/admin/shared/PageHeader";

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

export default function AdminReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="View analytics and generate reports" />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Revenue", value: `₹${dashboardStats.totalRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-green-600 bg-green-50" },
          { label: "Total Bookings", value: dashboardStats.completedThisMonth + dashboardStats.activeBookings, icon: CalendarCheck, color: "text-blue-600 bg-blue-50" },
          { label: "New Customers", value: dashboardStats.newCustomersThisMonth, icon: Users, color: "text-purple-600 bg-purple-50" },
          { label: "Avg Rating", value: dashboardStats.avgRating, icon: Star, color: "text-amber-600 bg-amber-50" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className={`flex size-9 items-center justify-center rounded-lg ${stat.color}`}><stat.icon className="size-5" /></div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="size-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Revenue Trend</h3>
        </div>
        <div className="flex items-end gap-3" style={{ height: 200 }}>
          {monthlyRevenue.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">₹{(m.value / 1000).toFixed(0)}k</span>
              <div className="w-full rounded-t-md bg-primary/80 transition-all" style={{ height: `${(m.value / maxRevenue) * 160}px` }} />
              <span className="text-xs text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Top Services */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-4 font-semibold text-foreground">Top Services</h3>
          <div className="space-y-3">
            {topServices.map((service, i) => (
              <div key={service.name} className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.bookings} bookings</p>
                </div>
                <span className="text-sm font-medium text-foreground">₹{service.revenue.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Technicians */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-4 font-semibold text-foreground">Top Technicians</h3>
          <div className="space-y-3">
            {topTechnicians.map((tech, i) => (
              <div key={tech.name} className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.jobs} jobs &middot; ★ {tech.rating}</p>
                </div>
                <span className="text-sm font-medium text-foreground">₹{tech.earnings.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
