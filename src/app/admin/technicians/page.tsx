"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Eye, Pencil, Star, Briefcase } from "lucide-react";
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

interface ApiTechnician {
  id: string;
  phone: string;
  name: string;
  role: string;
  createdAt: string;
  technicianProfile: {
    specialties: string[];
    rating: number;
    totalJobs: number;
    status: string;
    certifications: string[];
  } | null;
}

export default function AdminTechniciansPage() {
  const [data, setData] = useState<ApiTechnician[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewTech, setViewTech] = useState<ApiTechnician | null>(null);
  const [editTech, setEditTech] = useState<ApiTechnician | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignTech, setAssignTech] = useState<ApiTechnician | null>(null);

  const fetchTechnicians = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/technicians");
      const json = await res.json();
      setData(json.technicians);
    } catch {
      toast.error("Failed to load technicians");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const getSpecialties = (t: ApiTechnician) => t.technicianProfile?.specialties ?? [];
  const getRating = (t: ApiTechnician) => t.technicianProfile?.rating ?? 0;
  const getTotalJobs = (t: ApiTechnician) => t.technicianProfile?.totalJobs ?? 0;
  const getStatus = (t: ApiTechnician) => t.technicianProfile?.status ?? "offline";
  const getCertifications = (t: ApiTechnician) => t.technicianProfile?.certifications ?? [];

  const filtered = data.filter((t) => {
    const q = search.toLowerCase();
    const matchesSearch = t.name.toLowerCase().includes(q) || getSpecialties(t).some((s) => s.toLowerCase().includes(q));
    const matchesStatus = statusFilter === "all" || getStatus(t) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/technicians", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fd.get("phone"),
          password: fd.get("password"),
          name: fd.get("name"),
          specialties: (fd.get("specialties") as string).split(",").map((s) => s.trim()),
        }),
      });
      if (!res.ok) throw new Error();
      setAddOpen(false);
      toast.success("Technician added successfully");
      fetchTechnicians();
    } catch {
      toast.error("Failed to add technician");
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTech) return;
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/technicians", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editTech.id,
          name: fd.get("name"),
          phone: fd.get("phone"),
          specialties: (fd.get("specialties") as string).split(",").map((s) => s.trim()),
        }),
      });
      if (!res.ok) throw new Error();
      setEditTech(null);
      toast.success("Technician updated successfully");
      fetchTechnicians();
    } catch {
      toast.error("Failed to update technician");
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Technicians" description="Manage your technician workforce" actionLabel="Add Technician" onAction={() => setAddOpen(true)} />
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
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><div className="h-4 w-32 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell><div className="h-4 w-40 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell><div className="h-4 w-12 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell className="text-right"><div className="ml-auto h-4 w-8 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell><div className="h-5 w-16 animate-pulse rounded-full bg-muted" /></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

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
              filtered.map((tech, i) => {
                const specialties = getSpecialties(tech);
                return (
                  <motion.tr key={tech.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                    <TableCell className="font-medium">{tech.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {specialties.slice(0, 2).map((s) => (
                          <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{s}</span>
                        ))}
                        {specialties.length > 2 && <span className="text-xs text-muted-foreground">+{specialties.length - 2}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        {getRating(tech)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{getTotalJobs(tech)}</TableCell>
                    <TableCell><StatusBadge status={getStatus(tech)} /></TableCell>
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
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewTech} onOpenChange={() => setViewTech(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Technician Profile</DialogTitle></DialogHeader>
          {viewTech && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Name:</span> {viewTech.name}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={getStatus(viewTech)} /></div>
                <div><span className="text-muted-foreground">Phone:</span> {viewTech.phone}</div>
                <div><span className="text-muted-foreground">Rating:</span> <Star className="inline size-3.5 fill-amber-400 text-amber-400" /> {getRating(viewTech)}</div>
                <div><span className="text-muted-foreground">Total Jobs:</span> {getTotalJobs(viewTech)}</div>
                <div><span className="text-muted-foreground">Joined:</span> {new Date(viewTech.createdAt).toLocaleDateString("en-IN")}</div>
              </div>
              <div>
                <p className="mb-1 font-medium">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {getSpecialties(viewTech).map((s) => <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs">{s}</span>)}
                </div>
              </div>
              {getCertifications(viewTech).length > 0 && (
                <div>
                  <p className="mb-1 font-medium">Certifications</p>
                  <div className="flex flex-wrap gap-1">
                    {getCertifications(viewTech).map((c) => <span key={c} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{c}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Technician</DialogTitle></DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div><Label>Name</Label><Input name="name" required /></div>
            <div><Label>Phone</Label><Input name="phone" required /></div>
            <div><Label>Password</Label><Input name="password" type="password" required /></div>
            <div><Label>Specialties (comma separated)</Label><Input name="specialties" placeholder="e.g. Plumbing, Electrical" required /></div>
            <Button type="submit" className="w-full">Add Technician</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTech} onOpenChange={() => setEditTech(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Technician</DialogTitle></DialogHeader>
          {editTech && (
            <form onSubmit={handleEdit} className="space-y-4">
              <div><Label>Name</Label><Input name="name" defaultValue={editTech.name} required /></div>
              <div><Label>Phone</Label><Input name="phone" defaultValue={editTech.phone} required /></div>
              <div><Label>Specialties (comma separated)</Label><Input name="specialties" defaultValue={getSpecialties(editTech).join(", ")} required /></div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Assign Job</DialogTitle></DialogHeader>
          {assignTech && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-3 text-sm">
                <p className="font-medium">{assignTech.name}</p>
                <p className="text-muted-foreground">Specialties: {getSpecialties(assignTech).join(", ")}</p>
              </div>
              <div><Label>Select Booking</Label><Select><SelectTrigger><SelectValue placeholder="Choose a pending booking" /></SelectTrigger><SelectContent>
                <SelectItem value="BK-1028">BK-1028 - Washroom Cleaning</SelectItem>
                <SelectItem value="BK-1033">BK-1033 - Car Wash</SelectItem>
              </SelectContent></Select></div>
              <Button onClick={() => { setAssignOpen(false); toast.success(`Job assigned to ${assignTech.name}`); }} className="w-full">Assign Job</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
