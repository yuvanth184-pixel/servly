"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Eye, Pencil, Star, Briefcase } from "lucide-react";
import { technicians as initialTechnicians } from "@/data/technicians";
import type { Technician } from "@/types";
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

export default function AdminTechniciansPage() {
  const [data, setData] = useState<Technician[]>(initialTechnicians);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewTech, setViewTech] = useState<Technician | null>(null);
  const [editTech, setEditTech] = useState<Technician | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignTech, setAssignTech] = useState<Technician | null>(null);

  const filtered = data.filter((t) => {
    const q = search.toLowerCase();
    const matchesSearch = `${t.firstName} ${t.lastName}`.toLowerCase().includes(q) || t.specialties.some((s) => s.toLowerCase().includes(q));
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newTech: Technician = {
      id: `tech_${Date.now()}`,
      firstName: fd.get("firstName") as string,
      lastName: fd.get("lastName") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      specialties: (fd.get("specialties") as string).split(",").map((s) => s.trim()),
      rating: 4.5,
      totalJobs: 0,
      status: "available",
      availability: [],
      certifications: [],
      joinDate: new Date(),
    };
    setData((prev) => [newTech, ...prev]);
    setAddOpen(false);
    toast.success("Technician added successfully");
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTech) return;
    const fd = new FormData(e.currentTarget);
    setData((prev) =>
      prev.map((t) =>
        t.id === editTech.id
          ? { ...t, firstName: fd.get("firstName") as string, lastName: fd.get("lastName") as string, email: fd.get("email") as string, phone: fd.get("phone") as string, specialties: (fd.get("specialties") as string).split(",").map((s) => s.trim()) }
          : t
      )
    );
    setEditTech(null);
    toast.success("Technician updated successfully");
  };

  return (
    <div>
      <PageHeader title="Technicians" description="Manage your technician workforce" actionLabel="Add Technician" onAction={() => setAddOpen(true)} />

      <div className="mb-4 flex gap-3">
        <div className="flex-1">
          <SearchFilter value={search} onChange={setSearch} placeholder="Search by name or specialty..." />
        </div>
        <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Jobs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No technicians found.</TableCell></TableRow>
            ) : (
              filtered.map((tech, i) => (
                <motion.tr key={tech.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                  <TableCell className="font-medium">{tech.firstName} {tech.lastName}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tech.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{s}</span>
                      ))}
                      {tech.specialties.length > 2 && <span className="text-xs text-muted-foreground">+{tech.specialties.length - 2}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      {tech.rating}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{tech.totalJobs}</TableCell>
                  <TableCell><StatusBadge status={tech.status} /></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-md p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewTech(tech)}><Eye className="mr-2 size-4" /> View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditTech(tech)}><Pencil className="mr-2 size-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setAssignTech(tech); setAssignOpen(true); }}><Briefcase className="mr-2 size-4" /> Assign Job</DropdownMenuItem>
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
      <Dialog open={!!viewTech} onOpenChange={() => setViewTech(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Technician Profile</DialogTitle></DialogHeader>
          {viewTech && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Name:</span> {viewTech.firstName} {viewTech.lastName}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={viewTech.status} /></div>
                <div><span className="text-muted-foreground">Email:</span> {viewTech.email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {viewTech.phone}</div>
                <div><span className="text-muted-foreground">Rating:</span> <Star className="inline size-3.5 fill-amber-400 text-amber-400" /> {viewTech.rating}</div>
                <div><span className="text-muted-foreground">Total Jobs:</span> {viewTech.totalJobs}</div>
                <div><span className="text-muted-foreground">Joined:</span> {new Date(viewTech.joinDate).toLocaleDateString("en-IN")}</div>
              </div>
              <div>
                <p className="mb-1 font-medium">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {viewTech.specialties.map((s) => <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs">{s}</span>)}
                </div>
              </div>
              {viewTech.certifications.length > 0 && (
                <div>
                  <p className="mb-1 font-medium">Certifications</p>
                  <div className="flex flex-wrap gap-1">
                    {viewTech.certifications.map((c) => <span key={c} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{c}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Technician</DialogTitle></DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>First Name</Label><Input name="firstName" required /></div>
              <div><Label>Last Name</Label><Input name="lastName" required /></div>
            </div>
            <div><Label>Email</Label><Input name="email" type="email" required /></div>
            <div><Label>Phone</Label><Input name="phone" required /></div>
            <div><Label>Specialties (comma separated)</Label><Input name="specialties" placeholder="e.g. Plumbing, Electrical" required /></div>
            <Button type="submit" className="w-full">Add Technician</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editTech} onOpenChange={() => setEditTech(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Technician</DialogTitle></DialogHeader>
          {editTech && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name</Label><Input name="firstName" defaultValue={editTech.firstName} required /></div>
                <div><Label>Last Name</Label><Input name="lastName" defaultValue={editTech.lastName} required /></div>
              </div>
              <div><Label>Email</Label><Input name="email" type="email" defaultValue={editTech.email} required /></div>
              <div><Label>Phone</Label><Input name="phone" defaultValue={editTech.phone} required /></div>
              <div><Label>Specialties (comma separated)</Label><Input name="specialties" defaultValue={editTech.specialties.join(", ")} required /></div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Job Dialog */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Assign Job</DialogTitle></DialogHeader>
          {assignTech && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-3 text-sm">
                <p className="font-medium">{assignTech.firstName} {assignTech.lastName}</p>
                <p className="text-muted-foreground">Specialties: {assignTech.specialties.join(", ")}</p>
              </div>
              <div><Label>Select Booking</Label><Select><SelectTrigger><SelectValue placeholder="Choose a pending booking" /></SelectTrigger><SelectContent>
                <SelectItem value="BK-1028">BK-1028 - Washroom Cleaning</SelectItem>
                <SelectItem value="BK-1033">BK-1033 - Car Wash</SelectItem>
              </SelectContent></Select></div>
              <Button onClick={() => { setAssignOpen(false); toast.success(`Job assigned to ${assignTech.firstName}`); }} className="w-full">Assign Job</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
