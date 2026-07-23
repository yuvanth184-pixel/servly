"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Eye, Pencil, Crown, Bell } from "lucide-react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { SearchFilter } from "@/components/admin/shared/SearchFilter";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ApiSubscription {
  id: string;
  plan: string;
  status: string;
  amount: number;
  razorpayId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  user: { id: string; name: string; phone: string };
}

const planBadge: Record<string, string> = {
  starter: "bg-gray-50 text-gray-700 border-gray-200",
  pro: "bg-blue-50 text-blue-700 border-blue-200",
  free: "bg-purple-50 text-purple-700 border-purple-200",
};

const planLabel: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  free: "Free",
};

const tabs = ["All", "Active", "Expired", "Cancelled"] as const;

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-8 w-16 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
      <div className="rounded-xl border border-border bg-card">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="ml-auto h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminSubscriptionsPage() {
  const [data, setData] = useState<ApiSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [viewSub, setViewSub] = useState<ApiSubscription | null>(null);
  const [editSub, setEditSub] = useState<ApiSubscription | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/subscriptions")
      .then((res) => res.json())
      .then((json) => setData(json.subscriptions))
      .catch(() => toast.error("Failed to load subscriptions"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = data.filter((s) => {
    const q = search.toLowerCase();
    const name = s.user.name.toLowerCase();
    const matchesSearch = name.includes(q) || s.plan.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    const matchesTab = activeTab === "All" || s.status === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const activeCount = data.filter((s) => s.status === "active").length;
  const expiringSoon = data.filter((s) => s.status === "active" && s.endDate && new Date(s.endDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newSub: ApiSubscription = {
      id: `sub_${Date.now()}`,
      plan: fd.get("plan") as string,
      status: "active",
      amount: parseInt(fd.get("price") as string) || 0,
      razorpayId: "",
      startDate: new Date().toISOString(),
      endDate: "",
      createdAt: new Date().toISOString(),
      user: { id: fd.get("userId") as string, name: fd.get("userName") as string, phone: "" },
    };
    setData((prev) => [newSub, ...prev]);
    setAddOpen(false);
    toast.success("Subscription created successfully");
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editSub) return;
    const fd = new FormData(e.currentTarget);
    setData((prev) =>
      prev.map((s) =>
        s.id === editSub.id
          ? { ...s, plan: fd.get("plan") as string, amount: parseInt(fd.get("price") as string) || s.amount }
          : s
      )
    );
    setEditSub(null);
    toast.success("Subscription updated successfully");
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Subscriptions" description="Manage subscription plans" actionLabel="Create Plan" onAction={() => setAddOpen(true)} />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Subscriptions" description="Manage subscription plans" actionLabel="Create Plan" onAction={() => setAddOpen(true)} />

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Crown className="size-4 text-purple-600" />
            <p className="text-sm text-muted-foreground">Active Plans</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">{activeCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-amber-600" />
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">{expiringSoon.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total MRR</p>
          <p className="mt-1 text-2xl font-bold text-green-600">₹{data.filter((s) => s.status === "active").reduce((sum, s) => sum + s.amount, 0).toLocaleString("en-IN")}</p>
        </div>
      </div>

      <SearchFilter value={search} onChange={setSearch} placeholder="Search by customer or plan..." />

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-xl border border-border bg-muted p-1">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${activeTab === tab ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="text-right">Price/mo</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No subscriptions found.</TableCell></TableRow>
            ) : (
              filtered.map((sub, i) => (
                <motion.tr key={sub.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                  <TableCell className="font-medium">{sub.id}</TableCell>
                  <TableCell>{sub.user.name}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${planBadge[sub.plan] || ""}`}>
                      {planLabel[sub.plan] || sub.plan}
                    </span>
                  </TableCell>
                  <TableCell><StatusBadge status={sub.status} /></TableCell>
                  <TableCell>{new Date(sub.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                  <TableCell className="text-right">₹{sub.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-md p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewSub(sub)}><Eye className="mr-2 size-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditSub(sub)}><Pencil className="mr-2 size-4" /> Edit Plan</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Renewal Reminders */}
      {expiringSoon.length > 0 && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Bell className="size-4 text-amber-600" />
            <h3 className="font-semibold text-amber-800">Renewal Reminders</h3>
          </div>
          <div className="space-y-2">
            {expiringSoon.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between rounded-lg bg-white p-3 text-sm">
                <div>
                  <span className="font-medium">{sub.user.name}</span>
                  <span className="ml-2 text-muted-foreground">({sub.plan} plan)</span>
                </div>
                <span className="text-amber-700">Expires {sub.endDate ? new Date(sub.endDate).toLocaleDateString("en-IN") : "N/A"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={!!viewSub} onOpenChange={() => setViewSub(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Subscription Details</DialogTitle></DialogHeader>
          {viewSub && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">ID:</span> {viewSub.id}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={viewSub.status} /></div>
                <div><span className="text-muted-foreground">Customer:</span> {viewSub.user.name}</div>
                <div><span className="text-muted-foreground">Plan:</span> <span className="capitalize">{planLabel[viewSub.plan] || viewSub.plan}</span></div>
                <div><span className="text-muted-foreground">Amount:</span> ₹{viewSub.amount.toLocaleString("en-IN")}</div>
                <div><span className="text-muted-foreground">Razorpay ID:</span> {viewSub.razorpayId}</div>
                <div><span className="text-muted-foreground">Start Date:</span> {new Date(viewSub.startDate).toLocaleDateString("en-IN")}</div>
                {viewSub.endDate && <div><span className="text-muted-foreground">End Date:</span> {new Date(viewSub.endDate).toLocaleDateString("en-IN")}</div>}
                <div><span className="text-muted-foreground">Created:</span> {new Date(viewSub.createdAt).toLocaleDateString("en-IN")}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Subscription</DialogTitle></DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div><Label>User Name</Label><Input name="userName" required /></div>
            <div><Label>User ID</Label><Input name="userId" required /></div>
            <div><Label>Plan</Label><Select name="plan"><SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger><SelectContent><SelectItem value="starter">Starter</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="free">Free</SelectItem></SelectContent></Select></div>
            <div><Label>Monthly Price (₹)</Label><Input name="price" type="number" required /></div>
            <Button type="submit" className="w-full">Create Subscription</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editSub} onOpenChange={() => setEditSub(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Subscription</DialogTitle></DialogHeader>
          {editSub && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div><Label>Plan</Label><Select name="plan" defaultValue={editSub.plan}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="starter">Starter</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="free">Free</SelectItem></SelectContent></Select></div>
              <div><Label>Monthly Price (₹)</Label><Input name="price" type="number" defaultValue={editSub.amount} required /></div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
