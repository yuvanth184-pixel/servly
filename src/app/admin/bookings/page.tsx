"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Eye, Pencil, XCircle, CalendarPlus } from "lucide-react";
import { mockBookings, type Booking, type BookingStatus } from "@/data/bookings";
import { technicians } from "@/data/technicians";
import { serviceDetails } from "@/data/serviceDetails";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { SearchFilter } from "@/components/admin/shared/SearchFilter";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const tabs = ["All", "Pending", "In Progress", "Completed", "Cancelled"] as const;

export default function AdminBookingsPage() {
  const [data, setData] = useState<Booking[]>(mockBookings);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = data.filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch = b.id.toLowerCase().includes(q) || b.serviceName.toLowerCase().includes(q) || b.technicianName.toLowerCase().includes(q);
    if (activeTab === "All") return matchesSearch;
    return matchesSearch && b.status.toLowerCase().replace(" ", "_") === activeTab.toLowerCase().replace(" ", "_");
  });

  const handleCancel = () => {
    if (!cancelId) return;
    setData((prev) => prev.map((b) => b.id === cancelId ? { ...b, status: "cancelled" as BookingStatus } : b));
    setCancelId(null);
    toast.success("Booking cancelled");
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newBooking: Booking = {
      id: `BK-${Date.now()}`,
      serviceName: fd.get("service") as string,
      serviceType: fd.get("type") as string,
      technicianName: fd.get("technician") as string,
      status: "pending",
      scheduledDate: fd.get("date") as string,
      scheduledTime: fd.get("time") as string,
      address: fd.get("address") as string,
      totalAmount: parseInt(fd.get("amount") as string) || 0,
      paymentStatus: "pending",
    };
    setData((prev) => [newBooking, ...prev]);
    setCreateOpen(false);
    toast.success("Booking created successfully");
  };

  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    setData((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: newStatus as BookingStatus } : b));
    toast.success(`Booking status updated to ${newStatus.replace("_", " ")}`);
  };

  return (
    <div>
      <PageHeader title="Bookings" description="View and manage all bookings" actionLabel="Create Booking" onAction={() => setCreateOpen(true)} />
      <SearchFilter value={search} onChange={setSearch} placeholder="Search by booking ID, service, or technician..." />

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-xl border border-border bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No bookings found.</TableCell>
              </TableRow>
            ) : (
              filtered.map((booking, i) => (
                <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.serviceName}<br /><span className="text-xs text-muted-foreground">{booking.serviceType}</span></TableCell>
                  <TableCell>{booking.technicianName}</TableCell>
                  <TableCell>{new Date(booking.scheduledDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}<br /><span className="text-xs text-muted-foreground">{booking.scheduledTime}</span></TableCell>
                  <TableCell><StatusBadge status={booking.status} /></TableCell>
                  <TableCell className="text-right font-medium">₹{booking.totalAmount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-md p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewBooking(booking)}><Eye className="mr-2 size-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditBooking(booking)}><Pencil className="mr-2 size-4" /> Reschedule</DropdownMenuItem>
                        {booking.status !== "completed" && booking.status !== "cancelled" && (
                          <DropdownMenuItem onClick={() => setCancelId(booking.id)} className="text-destructive"><XCircle className="mr-2 size-4" /> Cancel</DropdownMenuItem>
                        )}
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
      <Dialog open={!!viewBooking} onOpenChange={() => setViewBooking(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Booking Details</DialogTitle></DialogHeader>
          {viewBooking && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">ID:</span> {viewBooking.id}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={viewBooking.status} /></div>
                <div><span className="text-muted-foreground">Service:</span> {viewBooking.serviceName}</div>
                <div><span className="text-muted-foreground">Type:</span> {viewBooking.serviceType}</div>
                <div><span className="text-muted-foreground">Technician:</span> {viewBooking.technicianName}</div>
                <div><span className="text-muted-foreground">Amount:</span> ₹{viewBooking.totalAmount}</div>
                <div><span className="text-muted-foreground">Date:</span> {viewBooking.scheduledDate}</div>
                <div><span className="text-muted-foreground">Time:</span> {viewBooking.scheduledTime}</div>
              </div>
              <div><span className="text-muted-foreground">Address:</span> {viewBooking.address}</div>
              <div><span className="text-muted-foreground">Payment:</span> <StatusBadge status={viewBooking.paymentStatus} /></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Create Booking</DialogTitle></DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div><Label>Service</Label><Select name="service"><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger><SelectContent>{serviceDetails.map((s) => <SelectItem key={s.slug} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Service Type</Label><Input name="type" placeholder="e.g. 2 BHK" required /></div>
            <div><Label>Technician</Label><Select name="technician"><SelectTrigger><SelectValue placeholder="Select technician" /></SelectTrigger><SelectContent>{technicians.map((t) => <SelectItem key={t.id} value={`${t.firstName} ${t.lastName}`}>{t.firstName} {t.lastName}</SelectItem>)}</SelectContent></Select></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Date</Label><Input name="date" type="date" required /></div>
              <div><Label>Time</Label><Input name="time" placeholder="e.g. 10:00 AM" required /></div>
            </div>
            <div><Label>Address</Label><Input name="address" required /></div>
            <div><Label>Amount (₹)</Label><Input name="amount" type="number" required /></div>
            <Button type="submit" className="w-full"><CalendarPlus className="mr-1 size-4" /> Create Booking</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit/Reschedule Dialog */}
      <Dialog open={!!editBooking} onOpenChange={() => setEditBooking(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reschedule Booking</DialogTitle></DialogHeader>
          {editBooking && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-3 text-sm">
                <p className="font-medium">{editBooking.id} - {editBooking.serviceName}</p>
                <p className="text-muted-foreground">Current: {editBooking.scheduledDate} at {editBooking.scheduledTime}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>New Date</Label><Input type="date" defaultValue={editBooking.scheduledDate} onChange={(e) => setEditBooking({ ...editBooking, scheduledDate: e.target.value })} /></div>
                <div><Label>New Time</Label><Input defaultValue={editBooking.scheduledTime} onChange={(e) => setEditBooking({ ...editBooking, scheduledTime: e.target.value })} /></div>
              </div>
              <Button onClick={() => { setEditBooking(null); toast.success("Booking rescheduled"); }} className="w-full">Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!cancelId} onOpenChange={() => setCancelId(null)} title="Cancel Booking" description="Are you sure you want to cancel this booking?" onConfirm={handleCancel} confirmLabel="Cancel Booking" />
    </div>
  );
}
