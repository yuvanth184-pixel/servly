"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Eye, Pencil, Crown, Bell } from "lucide-react";
import { subscriptions as initialSubscriptions } from "@/data/subscriptions";
import type { Subscription } from "@/types";
import { customers } from "@/data/customers";
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

const planBadge: Record<string, string> = {
  basic: "bg-gray-50 text-gray-700 border-gray-200",
  premium: "bg-blue-50 text-blue-700 border-blue-200",
  enterprise: "bg-purple-50 text-purple-700 border-purple-200",
};

const tabs = ["All", "Active", "Expired", "Cancelled"] as const;

export default function AdminSubscriptionsPage() {
  const [data, setData] = useState<Subscription[]>(initialSubscriptions);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [viewSub, setViewSub] = useState<Subscription | null>(null);
  const [editSub, setEditSub] = useState<Subscription | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const getCustomerName = (customerId: string) => {
    const c = customers.find((c) => c.id === customerId);
    return c ? `${c.firstName} ${c.lastName}` : customerId;
  };

  const filtered = data.filter((s) => {
    const q = search.toLowerCase();
    const name = getCustomerName(s.customerId).toLowerCase();
    const matchesSearch = name.includes(q) || s.plan.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    const matchesTab = activeTab === "All" || s.status === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const activeCount = data.filter((s) => s.status === "active").length;
  const expiringSoon = data.filter((s) => s.status === "active" && s.endDate && new Date(s.endDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newSub: Subscription = {
      id: `sub_${Date.now()}`,
      customerId: fd.get("customerId") as string,
      plan: fd.get("plan") as "basic" | "premium" | "enterprise",
      status: "active",
      startDate: new Date(),
      monthlyPrice: parseInt(fd.get("price") as string) || 0,
      features: [],
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
          ? { ...s, plan: fd.get("plan") as "basic" | "premium" | "enterprise", monthlyPrice: parseInt(fd.get("price") as string) || s.monthlyPrice }
          : s
      )
    );
    setEditSub(null);
    toast.success("Subscription updated successfully");
  };

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
          <p className="mt-1 text-2xl font-bold text-green-600">₹{data.filter((s) => s.status === "active").reduce((sum, s) => sum + s.monthlyPrice, 0).toLocaleString("en-IN")}</p>
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
                  <TableCell>{getCustomerName(sub.customerId)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${planBadge[sub.plan] || ""}`}>
                      {sub.plan}
                    </span>
                  </TableCell>
                  <TableCell><StatusBadge status={sub.status} /></TableCell>
                  <TableCell>{new Date(sub.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                  <TableCell className="text-right">₹{sub.monthlyPrice.toLocaleString("en-IN")}</TableCell>
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
                  <span className="font-medium">{getCustomerName(sub.customerId)}</span>
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
                <div><span className="text-muted-foreground">Customer:</span> {getCustomerName(viewSub.customerId)}</div>
                <div><span className="text-muted-foreground">Plan:</span> <span className="capitalize">{viewSub.plan}</span></div>
                <div><span className="text-muted-foreground">Monthly Price:</span> ₹{viewSub.monthlyPrice.toLocaleString("en-IN")}</div>
                <div><span className="text-muted-foreground">Start Date:</span> {new Date(viewSub.startDate).toLocaleDateString("en-IN")}</div>
                {viewSub.endDate && <div><span className="text-muted-foreground">End Date:</span> {new Date(viewSub.endDate).toLocaleDateString("en-IN")}</div>}
              </div>
              {viewSub.features.length > 0 && (
                <div>
                  <p className="mb-1 font-medium">Features</p>
                  <ul className="list-inside list-disc text-muted-foreground">
                    {viewSub.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Subscription</DialogTitle></DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div><Label>Customer</Label><Select name="customerId"><SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger><SelectContent>{customers.filter((c) => c.status === "active").map((c) => <SelectItem key={c.id} value={c.id}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Plan</Label><Select name="plan"><SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger><SelectContent><SelectItem value="basic">Basic</SelectItem><SelectItem value="premium">Premium</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem></SelectContent></Select></div>
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
              <div><Label>Plan</Label><Select name="plan" defaultValue={editSub.plan}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="basic">Basic</SelectItem><SelectItem value="premium">Premium</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem></SelectContent></Select></div>
              <div><Label>Monthly Price (₹)</Label><Input name="price" type="number" defaultValue={editSub.monthlyPrice} required /></div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
