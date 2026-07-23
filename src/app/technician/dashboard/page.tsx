"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ClipboardCheck, DollarSign, Star, Clock, MapPin, Phone } from "lucide-react";
import { technicians } from "@/data/technicians";
import { techJobs, type TechJobStatus } from "@/data/technician/techJobs";
import { techEarnings } from "@/data/technician/techEarnings";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { toast } from "sonner";

const currentTech = technicians[0]; // Marcus Rodriguez

const statusColor: Record<string, string> = {
  available: "bg-green-100 text-green-700 border-green-300",
  busy: "bg-amber-100 text-amber-700 border-amber-300",
  offline: "bg-gray-100 text-gray-600 border-gray-300",
};

export default function TechnicianDashboardPage() {
  const [techStatus, setTechStatus] = useState(currentTech.status);

  const todayJobs = techJobs.filter((j) => j.scheduledDate === "2026-07-22" && j.status !== "completed" && j.status !== "cancelled");
  const completedJobs = techJobs.filter((j) => j.status === "completed");
  const totalEarned = techEarnings.filter((e) => e.status === "paid").reduce((sum, e) => sum + e.amount, 0);

  const statCards = [
    { label: "Today's Jobs", value: todayJobs.length, icon: ClipboardCheck, color: "text-blue-600 bg-blue-50" },
    { label: "Completed", value: completedJobs.length, icon: Star, color: "text-green-600 bg-green-50" },
    { label: "Total Earned", value: `₹${totalEarned.toLocaleString("en-IN")}`, icon: DollarSign, color: "text-purple-600 bg-purple-50" },
    { label: "Rating", value: currentTech.rating, icon: Star, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Status Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome, {currentTech.firstName}
          </h1>
          <p className="text-muted-foreground">{currentTech.specialties.join(" • ")}</p>
        </div>
        <div className="flex gap-2">
          {(["available", "busy", "offline"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setTechStatus(s); toast.success(`Status changed to ${s}`); }}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                techStatus === s ? statusColor[s] : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
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

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Today's Schedule */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Today&apos;s Schedule</h3>
          </div>
          {todayJobs.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">No jobs scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {todayJobs.map((job) => (
                <div key={job.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{job.serviceName}</p>
                      <p className="text-sm text-muted-foreground">{job.serviceType}</p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1"><Clock className="size-3" /> {job.scheduledTime}</p>
                    <p className="flex items-center gap-1"><MapPin className="size-3" /> {job.address}</p>
                    <p className="flex items-center gap-1"><Phone className="size-3" /> {job.customerName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Completed */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-4 font-semibold text-foreground">Recent Completed Jobs</h3>
          <div className="space-y-3">
            {completedJobs.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{job.serviceName}</p>
                  <p className="text-xs text-muted-foreground">{job.customerName} &middot; {new Date(job.scheduledDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                </div>
                <p className="text-sm font-semibold text-green-600">₹{job.amount}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
