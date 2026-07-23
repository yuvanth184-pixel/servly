"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  phone: string;
  name: string | null;
  role: string;
  createdAt: string;
}

const roleConfig: Record<string, { label: string; icon: typeof Shield; color: string; bg: string }> = {
  admin: { label: "Admin", icon: ShieldCheck, color: "text-purple-700", bg: "bg-purple-50" },
  customer: { label: "Customer", icon: Shield, color: "text-blue-700", bg: "bg-blue-50" },
  technician: { label: "Technician", icon: ShieldAlert, color: "text-amber-700", bg: "bg-amber-50" },
};

const roles = ["admin", "customer", "technician"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });

    if (!res.ok) {
      toast.error("Failed to update role");
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    toast.success("Role updated");
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const fd = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: fd.get("phone"),
        password: fd.get("password"),
        name: fd.get("name") || null,
        role: fd.get("role"),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Failed to create user");
      setCreating(false);
      return;
    }

    const data = await res.json();
    setUsers((prev) => [data.user, ...prev]);
    setCreateOpen(false);
    setCreating(false);
    toast.success(`User created as ${roleConfig[data.user.role]?.label || data.user.role}`);
  };

  return (
    <div>
      <PageHeader title="Users" description="Manage user roles and access" actionLabel="Create User" onAction={() => setCreateOpen(true)} />

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phone</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-40">Change Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, i) => {
                const cfg = roleConfig[user.role] || roleConfig.customer;
                const Icon = cfg.icon;
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <TableCell className="font-medium">+91 {user.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{user.name || "—"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.color}`}>
                        <Icon className="size-3" />
                        {cfg.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {roles.map((r) => (
                          <Button
                            key={r}
                            variant={user.role === r ? "default" : "outline"}
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleRoleChange(user.id, r)}
                            disabled={user.role === r}
                          >
                            {roleConfig[r].label}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label>Phone Number</Label>
              <Input name="phone" required maxLength={10} placeholder="10-digit phone number" />
            </div>
            <div>
              <Label>Password</Label>
              <Input name="password" type="password" required minLength={6} placeholder="Min 6 characters" />
            </div>
            <div>
              <Label>Name (optional)</Label>
              <Input name="name" placeholder="Full name" />
            </div>
            <div>
              <Label>Role</Label>
              <select
                name="role"
                required
                className="flex h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground"
                defaultValue="customer"
              >
                <option value="customer">Customer</option>
                <option value="technician">Technician</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={creating}>
              {creating ? "Creating..." : "Create User"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
