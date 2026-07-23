"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { SearchFilter } from "@/components/admin/shared/SearchFilter";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface AdminCustomer {
  id: string;
  phone: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  _count: { bookings: number };
  subscription: { plan: string; status: string; amount: number } | null;
}

export default function AdminCustomersPage() {
  const [data, setData] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewCustomer, setViewCustomer] = useState<AdminCustomer | null>(null);
  const [editCustomer, setEditCustomer] = useState<AdminCustomer | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/customers");
      const json = await res.json();
      setData(json.customers || []);
    } catch {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = data.filter((c) => {
    const q = search.toLowerCase();
    return (
      (c.name || "").toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch("/api/admin/customers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: deleteId }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteId(null);
      toast.success("Customer deleted successfully");
      fetchCustomers();
    } catch {
      toast.error("Failed to delete customer");
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fd.get("phone"),
          password: fd.get("password"),
          name: fd.get("name"),
        }),
      });
      if (!res.ok) throw new Error("Add failed");
      setAddOpen(false);
      toast.success("Customer added successfully");
      fetchCustomers();
    } catch {
      toast.error("Failed to add customer");
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editCustomer) return;
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/customers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editCustomer.id,
          name: fd.get("name"),
          phone: fd.get("phone"),
        }),
      });
      if (!res.ok) throw new Error("Edit failed");
      setEditCustomer(null);
      toast.success("Customer updated successfully");
      fetchCustomers();
    } catch {
      toast.error("Failed to update customer");
    }
  };

  return (
    <div>
      <PageHeader title="Customers" description="Manage your customer database" actionLabel="Add Customer" onAction={() => setAddOpen(true)} />
      <SearchFilter value={search} onChange={setSearch} placeholder="Search by name or phone..." />

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Bookings</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <div className="h-4 animate-pulse rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((customer, i) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="group"
                >
                  <TableCell className="font-medium">
                    {customer.name || customer.phone}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                  <TableCell><StatusBadge status={customer.role} /></TableCell>
                  <TableCell className="text-right">{customer._count.bookings}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.subscription?.plan ?? "—"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-md p-1 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewCustomer(customer)}>
                          <Eye className="mr-2 size-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditCustomer(customer)}>
                          <Pencil className="mr-2 size-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteId(customer.id)} className="text-destructive">
                          <Trash2 className="mr-2 size-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewCustomer} onOpenChange={() => setViewCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {viewCustomer && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Name:</span> {viewCustomer.name || viewCustomer.phone}</div>
                <div><span className="text-muted-foreground">Phone:</span> {viewCustomer.phone}</div>
                <div><span className="text-muted-foreground">Role:</span> <StatusBadge status={viewCustomer.role} /></div>
                <div><span className="text-muted-foreground">Plan:</span> {viewCustomer.subscription?.plan ?? "—"}</div>
                <div><span className="text-muted-foreground">Bookings:</span> {viewCustomer._count.bookings}</div>
                <div><span className="text-muted-foreground">Member Since:</span> {new Date(viewCustomer.createdAt).toLocaleDateString("en-IN")}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div><Label>Name</Label><Input name="name" required /></div>
            <div><Label>Phone</Label><Input name="phone" required /></div>
            <div><Label>Password</Label><Input name="password" type="password" required /></div>
            <Button type="submit" className="w-full">Add Customer</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editCustomer} onOpenChange={() => setEditCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {editCustomer && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div><Label>Name</Label><Input name="name" defaultValue={editCustomer.name} required /></div>
              <div><Label>Phone</Label><Input name="phone" defaultValue={editCustomer.phone} required /></div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Customer"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        onConfirm={handleDelete}
      />
    </div>
  );
}
