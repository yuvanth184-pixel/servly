"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Clock, MapPin, Phone, CheckCircle2, PlayCircle, XCircle, Eye } from "lucide-react";
import { techJobs, type TechJob, type TechJobStatus } from "@/data/technician/techJobs";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { SearchFilter } from "@/components/admin/shared/SearchFilter";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const tabs = ["All", "Pending", "In Progress", "Completed"] as const;

export default function TechnicianJobsPage() {
  const [data, setData] = useState<TechJob[]>(techJobs);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [viewJob, setViewJob] = useState<TechJob | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const filtered = data.filter((j) => {
    const q = search.toLowerCase();
    const matchesSearch = j.id.toLowerCase().includes(q) || j.serviceName.toLowerCase().includes(q) || j.customerName.toLowerCase().includes(q);
    if (activeTab === "All") return matchesSearch;
    const tabStatus = activeTab === "In Progress" ? "in_progress" : activeTab.toLowerCase();
    return matchesSearch && j.status === tabStatus;
  });

  const updateStatus = (jobId: string, newStatus: TechJobStatus) => {
    setData((prev) => prev.map((j) => j.id === jobId ? { ...j, status: newStatus } : j));
    const labels: Record<string, string> = { accepted: "accepted", in_progress: "started", completed: "completed" };
    toast.success(`Job ${labels[newStatus] || newStatus}`);
  };

  const handleCancel = () => {
    if (!cancelId) return;
    setData((prev) => prev.map((j) => j.id === cancelId ? { ...j, status: "cancelled" } : j));
    setCancelId(null);
    toast.success("Job cancelled");
  };

  return (
    <div>
      <PageHeader title="My Jobs" description="View and manage your assigned jobs" />
      <SearchFilter value={search} onChange={setSearch} placeholder="Search by job ID, service, or customer..." />

      <div className="mb-4 flex gap-1 rounded-xl border border-border bg-muted p-1">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${activeTab === tab ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-muted-foreground">No jobs found.</p>
          </div>
        ) : (
          filtered.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{job.serviceName}</h3>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{job.serviceType} &middot; {job.id}</p>
                </div>
                <p className="text-lg font-bold text-foreground">₹{job.amount}</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="size-3.5" /> {new Date(job.scheduledDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at {job.scheduledTime}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {job.address}</span>
                <span className="flex items-center gap-1"><Phone className="size-3.5" /> {job.customerName}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setViewJob(job)}>
                  <Eye className="mr-1 size-3.5" /> View Details
                </Button>
                {job.status === "pending" && (
                  <>
                    <Button size="sm" onClick={() => updateStatus(job.id, "accepted")}>Accept</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => setCancelId(job.id)}>
                      <XCircle className="mr-1 size-3.5" /> Decline
                    </Button>
                  </>
                )}
                {job.status === "accepted" && (
                  <Button size="sm" onClick={() => updateStatus(job.id, "in_progress")}>
                    <PlayCircle className="mr-1 size-3.5" /> Start Job
                  </Button>
                )}
                {job.status === "in_progress" && (
                  <Button size="sm" onClick={() => updateStatus(job.id, "completed")}>
                    <CheckCircle2 className="mr-1 size-3.5" /> Complete
                  </Button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewJob} onOpenChange={() => setViewJob(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Job Details</DialogTitle></DialogHeader>
          {viewJob && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Job ID:</span> {viewJob.id}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={viewJob.status} /></div>
                <div><span className="text-muted-foreground">Service:</span> {viewJob.serviceName}</div>
                <div><span className="text-muted-foreground">Type:</span> {viewJob.serviceType}</div>
                <div><span className="text-muted-foreground">Customer:</span> {viewJob.customerName}</div>
                <div><span className="text-muted-foreground">Phone:</span> {viewJob.customerPhone}</div>
                <div><span className="text-muted-foreground">Date:</span> {viewJob.scheduledDate}</div>
                <div><span className="text-muted-foreground">Time:</span> {viewJob.scheduledTime}</div>
                <div><span className="text-muted-foreground">Amount:</span> ₹{viewJob.amount}</div>
              </div>
              <div><span className="text-muted-foreground">Address:</span> {viewJob.address}</div>
              {viewJob.notes && <div className="rounded-lg bg-muted p-3"><span className="text-muted-foreground">Notes:</span> {viewJob.notes}</div>}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!cancelId} onOpenChange={() => setCancelId(null)} title="Decline Job" description="Are you sure you want to decline this job?" onConfirm={handleCancel} confirmLabel="Decline" />
    </div>
  );
}
