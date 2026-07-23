"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Bell, CalendarCheck, DollarSign, Clock, Info, CheckCheck } from "lucide-react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "booking" | "payment" | "reminder" | "system";
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
}

const initialNotifications: Notification[] = [
  { id: "n1", type: "booking", title: "New Job Assigned", message: "You have been assigned BK-1026 - AC Service & Repair for today at 11:00 AM", isRead: false, timestamp: "2 hours ago" },
  { id: "n2", type: "payment", title: "Payment Received", message: "₹180 has been credited for BK-1024 - Sofa & Carpet Cleaning", isRead: false, timestamp: "1 day ago" },
  { id: "n3", type: "reminder", title: "Upcoming Job", message: "Reminder: BK-1027 - Full Home Cleaning tomorrow at 9:00 AM", isRead: false, timestamp: "1 day ago" },
  { id: "n4", type: "booking", title: "Job Rescheduled", message: "BK-1028 has been rescheduled to Jul 25 at 3:00 PM", isRead: true, timestamp: "2 days ago" },
  { id: "n5", type: "payment", title: "Payment Received", message: "₹220 has been credited for BK-1031 - Kitchen Cleaning", isRead: true, timestamp: "5 days ago" },
  { id: "n6", type: "system", title: "Profile Updated", message: "Your profile information has been updated successfully", isRead: true, timestamp: "1 week ago" },
  { id: "n7", type: "reminder", title: "Schedule Change", message: "Your Saturday schedule has been shortened to 9 AM - 2 PM", isRead: true, timestamp: "1 week ago" },
  { id: "n8", type: "payment", title: "Payment Received", message: "₹100 has been credited for BK-1032 - Pest Control", isRead: true, timestamp: "2 weeks ago" },
  { id: "n9", type: "system", title: "New Feature", message: "Referral program is now available. Earn ₹100 for each referral!", isRead: true, timestamp: "2 weeks ago" },
  { id: "n10", type: "booking", title: "Job Completed", message: "BK-1034 has been marked as completed. Payment pending.", isRead: true, timestamp: "3 weeks ago" },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  booking: CalendarCheck,
  payment: DollarSign,
  reminder: Clock,
  system: Info,
};

const typeColors: Record<string, string> = {
  booking: "bg-blue-50 text-blue-600",
  payment: "bg-green-50 text-green-600",
  reminder: "bg-amber-50 text-amber-600",
  system: "bg-purple-50 text-purple-600",
};

export default function TechnicianNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        description={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
        actionLabel="Mark All Read"
        onAction={unreadCount > 0 ? markAllRead : undefined}
      />

      <div className="space-y-2">
        {notifications.map((notification, i) => {
          const Icon = typeIcons[notification.type] || Bell;
          const color = typeColors[notification.type] || "bg-gray-50 text-gray-600";
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => markRead(notification.id)}
              className={`flex items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/50 ${
                !notification.isRead ? "bg-primary/5" : ""
              }`}
            >
              <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${color}`}>
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm ${!notification.isRead ? "font-semibold" : "font-medium"} text-foreground`}>
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{notification.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{notification.timestamp}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
