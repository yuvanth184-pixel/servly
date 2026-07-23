"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { customers } from "@/data/customers";
import { type Customer } from "@/types";
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

export default function AdminCustomersPage() {
  const [data, setData] = useState<Customer[]>(customers);
  const [search, setSearch] = useState("");
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = data.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  });

  const handleDelete = () => {
    if (!deleteId) return;
    setData((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    toast.success("Customer deleted successfully");
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newCustomer: Customer = {
      id: `cust_${Date.now()}`,
      firstName: fd.get("firstName") as string,
      lastName: fd.get("lastName") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      address: { street: "", city: "", state: "", zipCode: "", country: "India" },
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
      totalBookings: 0,
      totalSpent: 0,
    };
    setData((prev) => [newCustomer, ...prev]);
    setAddOpen(false);
    toast.success("Customer added successfully");
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editCustomer) return;
    const fd = new FormData(e.currentTarget);
    setData((prev) =>
      prev.map((c) =>
        c.id === editCustomer.id
          ? { ...c, firstName: fd.get("firstName") as string, lastName: fd.get("lastName") as string, email: fd.get("email") as string, phone: fd.get("phone") as string }
          : c
      )
    );
    setEditCustomer(null);
    toast.success("Customer updated successfully");
  };

  return (
    <div>
      <PageHeader title="Customers" description="Manage your customer database" actionLabel="Add Customer" onAction={() => setAddOpen(true)} />
      <SearchFilter value={search} onChange={setSearch} placeholder="Search by name, email or phone..." />

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Bookings</TableHead>
              <TableHead className="text-right">Spent</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
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
                    {customer.firstName} {customer.lastName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                  <TableCell><StatusBadge status={customer.status} /></TableCell>
                  <TableCell className="text-right">{customer.totalBookings}</TableCell>
                  <TableCell className="text-right">₹{customer.totalSpent.toLocaleString("en-IN")}</TableCell>
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

      {/* View Dialog */}
      <Dialog open={!!viewCustomer} onOpenChange={() => setViewCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {viewCustomer && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Name:</span> {viewCustomer.firstName} {viewCustomer.lastName}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={viewCustomer.status} /></div>
                <div><span className="text-muted-foreground">Email:</span> {viewCustomer.email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {viewCustomer.phone}</div>
                <div><span className="text-muted-foreground">Total Bookings:</span> {viewCustomer.totalBookings}</div>
                <div><span className="text-muted-foreground">Total Spent:</span> ₹{viewCustomer.totalSpent.toLocaleString("en-IN")}</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="mb-1 font-medium">Address</p>
                <p className="text-muted-foreground">{viewCustomer.address.street}, {viewCustomer.address.city}, {viewCustomer.address.state} {viewCustomer.address.zipCode}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>First Name</Label><Input name="firstName" required /></div>
              <div><Label>Last Name</Label><Input name="lastName" required /></div>
            </div>
            <div><Label>Email</Label><Input name="email" type="email" required /></div>
            <div><Label>Phone</Label><Input name="phone" required /></div>
            <Button type="submit" className="w-full">Add Customer</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editCustomer} onOpenChange={() => setEditCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {editCustomer && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name</Label><Input name="firstName" defaultValue={editCustomer.firstName} required /></div>
                <div><Label>Last Name</Label><Input name="lastName" defaultValue={editCustomer.lastName} required /></div>
              </div>
              <div><Label>Email</Label><Input name="email" type="email" defaultValue={editCustomer.email} required /></div>
              <div><Label>Phone</Label><Input name="phone" defaultValue={editCustomer.phone} required /></div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
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
