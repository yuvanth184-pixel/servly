"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function TechnicianSettingsPage() {
  const [notifications, setNotifications] = useState({
    newJobs: true,
    jobReminders: true,
    paymentReceived: true,
    scheduleChanges: true,
    promotions: false,
  });

  return (
    <div>
      <PageHeader title="Settings" description="Configure your account settings" />

      <div className="space-y-6">
        {/* Account Settings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Account Settings</h3>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved"); }} className="space-y-4">
            <div><Label>Email</Label><Input type="email" defaultValue="marcus.rodriguez@email.com" /></div>
            <div><Label>Phone</Label><Input defaultValue="+91 98765 12345" /></div>
            <Separator />
            <div><Label>Current Password</Label><Input type="password" placeholder="Enter current password" /></div>
            <div><Label>New Password</Label><Input type="password" placeholder="Enter new password" /></div>
            <Button type="submit">Save Changes</Button>
          </form>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "newJobs" as const, label: "New Job Assignments", desc: "Get notified when a new job is assigned to you" },
              { key: "jobReminders" as const, label: "Job Reminders", desc: "Receive reminders before scheduled jobs" },
              { key: "paymentReceived" as const, label: "Payment Received", desc: "Get notified when payment is processed" },
              { key: "scheduleChanges" as const, label: "Schedule Changes", desc: "Alerts when jobs are rescheduled or cancelled" },
              { key: "promotions" as const, label: "Promotions & Tips", desc: "Receive tips and promotional content" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                />
              </div>
            ))}
          </div>
          <Button className="mt-4" onClick={() => toast.success("Notification preferences saved")}>Save Preferences</Button>
        </motion.div>
      </div>
    </div>
  );
}
