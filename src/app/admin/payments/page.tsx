"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MoreHorizontal, Eye, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { SearchFilter } from "@/components/admin/shared/SearchFilter";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ApiPayment {
  id: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string;
  createdAt: string;
  bookingId: string;
  customer: { id: string; name: string; phone: string };
}

const methodLabels: Record<string, string> = {
  credit_card: "Credit Card",
  debit_card: "Debit Card",
  cash: "Cash",
  bank_transfer: "Bank Transfer",
};

export default function AdminPaymentsPage() {
  const [data, setData] = useState<ApiPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewPayment, setViewPayment] = useState<ApiPayment | null>(null);
  const [refundId, setRefundId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/payments");
        const json = await res.json();
        setData(json.payments ?? []);
      } catch {
        toast.error("Failed to load payments data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = data.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.id.toLowerCase().includes(q) ||
      p.bookingId.toLowerCase().includes(q) ||
      p.transactionId.toLowerCase().includes(q) ||
      p.customer.name.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCompleted = data.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = data.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const totalRefunded = data.filter((p) => p.status === "refunded").reduce((sum, p) => sum + p.amount, 0);

  const handleRefund = () => {
    if (!refundId) return;
    setData((prev) => prev.map((p) => p.id === refundId ? { ...p, status: "refunded" } : p));
    setRefundId(null);
    toast.success("Refund processed successfully");
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Payments" description="Track and process payments" />
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <div className="h-4 w-20 animate-pulse rounded bg-muted mb-2" />
              <div className="h-6 w-28 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
        <div className="mb-4 flex gap-3">
          <div className="flex-1"><div className="h-10 w-full animate-pulse rounded-lg bg-muted" /></div>
          <div className="h-10 w-40 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Booking</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><div className="h-4 w-24 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell><div className="h-4 w-20 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell><div className="h-4 w-24 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell><div className="h-5 w-16 animate-pulse rounded-full bg-muted" /></TableCell>
                  <TableCell><div className="h-4 w-20 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell className="text-right"><div className="ml-auto h-4 w-14 animate-pulse rounded bg-muted" /></TableCell>
                  <TableCell><div className="h-4 w-4 animate-pulse rounded bg-muted" /></TableCell>
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
      <PageHeader title="Payments" description="Track and process payments" />

      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-xl font-bold text-green-600">₹{totalCompleted.toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-xl font-bold text-amber-600">₹{totalPending.toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Refunded</p>
          <p className="text-xl font-bold text-red-600">₹{totalRefunded.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <div className="flex-1">
          <SearchFilter value={search} onChange={setSearch} placeholder="Search by payment ID, booking ID, customer..." />
        </div>
        <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Booking</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No payments found.</TableCell></TableRow>
            ) : (
              filtered.map((payment, i) => (
                <motion.tr key={payment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.bookingId}</TableCell>
                  <TableCell>{methodLabels[payment.method] || payment.method}</TableCell>
                  <TableCell><StatusBadge status={payment.status} /></TableCell>
                  <TableCell>{new Date(payment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                  <TableCell className="text-right font-medium">₹{payment.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-md p-1 text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewPayment(payment)}><Eye className="mr-2 size-4" /> View Details</DropdownMenuItem>
                        {payment.status === "completed" && (
                          <DropdownMenuItem onClick={() => setRefundId(payment.id)}><RotateCcw className="mr-2 size-4" /> Refund</DropdownMenuItem>
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

      <Dialog open={!!viewPayment} onOpenChange={() => setViewPayment(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Payment Details</DialogTitle></DialogHeader>
          {viewPayment && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Payment ID:</span> {viewPayment.id}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={viewPayment.status} /></div>
                <div><span className="text-muted-foreground">Booking ID:</span> {viewPayment.bookingId}</div>
                <div><span className="text-muted-foreground">Amount:</span> ₹{viewPayment.amount.toLocaleString("en-IN")}</div>
                <div><span className="text-muted-foreground">Method:</span> {methodLabels[viewPayment.method] || viewPayment.method}</div>
                <div><span className="text-muted-foreground">Transaction ID:</span> {viewPayment.transactionId}</div>
                <div><span className="text-muted-foreground">Date:</span> {new Date(viewPayment.createdAt).toLocaleDateString("en-IN")}</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-muted-foreground mb-1">Customer</p>
                <p className="font-medium">{viewPayment.customer.name}</p>
                <p className="text-muted-foreground">{viewPayment.customer.phone}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!refundId} onOpenChange={() => setRefundId(null)} title="Process Refund" description="Are you sure you want to refund this payment? The amount will be returned to the customer." onConfirm={handleRefund} confirmLabel="Process Refund" />
    </div>
  );
}
