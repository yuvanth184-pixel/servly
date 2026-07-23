"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check, Gift, Users, IndianRupee, Clock } from "lucide-react";
import { referralCode, referrals, referralStats } from "@/data/technician/techReferrals";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TechnicianReferralsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode).catch(() => {});
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const statCards = [
    { label: "Total Referrals", value: referralStats.totalReferrals, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Completed", value: referralStats.completedReferrals, icon: Check, color: "text-green-600 bg-green-50" },
    { label: "Total Earned", value: `₹${referralStats.totalEarned}`, icon: IndianRupee, color: "text-purple-600 bg-purple-50" },
    { label: "Pending Rewards", value: `₹${referralStats.pendingRewards}`, icon: Clock, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Referral Program</h1>
        <p className="text-muted-foreground">Invite other technicians and earn rewards</p>
      </div>

      {/* Referral Code Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-dashed-200 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Gift className="size-5 text-primary" />
          <h3 className="font-semibold text-foreground">Your Referral Code</h3>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Share this code with other technicians. You&apos;ll earn ₹100 for each successful referral!
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-lg border border-border bg-white px-4 py-3 text-center font-mono text-2xl font-bold tracking-widest text-foreground">
            {referralCode}
          </div>
          <Button onClick={handleCopy} variant={copied ? "default" : "outline"} size="lg">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
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

      {/* Referral Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card">
        <div className="p-4">
          <h3 className="font-semibold text-foreground">Your Referrals</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Reward</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referrals.map((ref, i) => (
              <motion.tr key={ref.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <TableCell className="font-medium">{ref.referredName}</TableCell>
                <TableCell>{new Date(ref.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</TableCell>
                <TableCell><StatusBadge status={ref.status} /></TableCell>
                <TableCell className="text-right">{ref.reward > 0 ? `₹${ref.reward}` : "—"}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
