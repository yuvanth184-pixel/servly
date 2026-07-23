"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Pencil, Trash2, Star } from "lucide-react";
import { services as initialServices } from "@/data/services";
import type { Service } from "@/types";
import { useService } from "@/context/service-context";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { SearchFilter } from "@/components/admin/shared/SearchFilter";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const categories = ["Plumbing", "Electrical", "HVAC", "Cleaning", "Carpentry", "Painting", "Landscaping", "Pest Control"];

const STORAGE_KEY = "servly-service-status";

function getInitialData(): Service[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const status: Record<string, boolean> = JSON.parse(stored);
      return initialServices.map((s) =>
        s.slug && status[s.slug] !== undefined
          ? { ...s, isActive: status[s.slug] }
          : s
      );
    }
  } catch {}
  return initialServices;
}

export default function AdminServicesPage() {
  const [data, setData] = useState<Service[]>(initialServices);
  const [search, setSearch] = useState("");
  const [editService, setEditService] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const { toggleService } = useService();

  useEffect(() => {
    setData(getInitialData());
  }, []);

  const filtered = data.filter((s) => {
    const q = search.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
  });

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newService: Service = {
      id: `svc_${Date.now()}`,
      name: fd.get("name") as string,
      description: fd.get("description") as string,
      category: fd.get("category") as string,
      basePrice: parseInt(fd.get("price") as string) || 0,
      duration: parseInt(fd.get("duration") as string) || 60,
      isActive: true,
      rating: 4.5,
      totalBookings: 0,
    };
    setData((prev) => [newService, ...prev]);
    setAddOpen(false);
    toast.success("Service added successfully");
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editService) return;
    const fd = new FormData(e.currentTarget);
    setData((prev) =>
      prev.map((s) =>
        s.id === editService.id
          ? { ...s, name: fd.get("name") as string, description: fd.get("description") as string, category: fd.get("category") as string, basePrice: parseInt(fd.get("price") as string) || s.basePrice, duration: parseInt(fd.get("duration") as string) || s.duration }
          : s
      )
    );
    setEditService(null);
    toast.success("Service updated successfully");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setData((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
    toast.success("Service deleted successfully");
  };

  const toggleActive = (id: string) => {
    setData((prev) => prev.map((s) => s.id === id ? { ...s, isActive: !s.isActive } : s));
    const service = data.find((s) => s.id === id);
    if (service?.slug) toggleService(service.slug);
    toast.success("Service status updated");
  };

  return (
    <div>
      <PageHeader title="Services" description="Manage your service catalog" actionLabel="Add Service" onAction={() => setAddOpen(true)} />
      <SearchFilter value={search} onChange={setSearch} placeholder="Search by name or category..." />

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Duration</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Bookings</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="h-24 text-center text-muted-foreground">No services found.</TableCell></TableRow>
            ) : (
              filtered.map((service, i) => (
                <motion.tr key={service.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{service.category}</span></TableCell>
                  <TableCell className="text-right">₹{service.basePrice}</TableCell>
                  <TableCell className="text-right">{service.duration} min</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      {service.rating}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{service.totalBookings}</TableCell>
                  <TableCell>
                    <Switch checked={service.isActive} onCheckedChange={() => toggleActive(service.id)} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-md p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditService(service)}><Pencil className="mr-2 size-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteId(service.id)} className="text-destructive"><Trash2 className="mr-2 size-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Service</DialogTitle></DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div><Label>Name</Label><Input name="name" required /></div>
            <div><Label>Category</Label><Select name="category"><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Description</Label><Textarea name="description" required /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Base Price (₹)</Label><Input name="price" type="number" required /></div>
              <div><Label>Duration (min)</Label><Input name="duration" type="number" required /></div>
            </div>
            <Button type="submit" className="w-full">Add Service</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editService} onOpenChange={() => setEditService(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Service</DialogTitle></DialogHeader>
          {editService && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div><Label>Name</Label><Input name="name" defaultValue={editService.name} required /></div>
              <div><Label>Category</Label><Select name="category" defaultValue={editService.category}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Description</Label><Textarea name="description" defaultValue={editService.description} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Base Price (₹)</Label><Input name="price" type="number" defaultValue={editService.basePrice} required /></div>
                <div><Label>Duration (min)</Label><Input name="duration" type="number" defaultValue={editService.duration} required /></div>
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Service" description="Are you sure you want to delete this service? This action cannot be undone." onConfirm={handleDelete} />
    </div>
  );
}
