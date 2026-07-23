import { Badge } from "@/components/ui/badge";

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  paid: "bg-green-50 text-green-700 border-green-200",
  available: "bg-green-50 text-green-700 border-green-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  in_progress: "bg-purple-50 text-purple-700 border-purple-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  overdue: "bg-amber-50 text-amber-700 border-amber-200",
  busy: "bg-amber-50 text-amber-700 border-amber-200",
  inactive: "bg-gray-50 text-gray-600 border-gray-200",
  draft: "bg-gray-50 text-gray-600 border-gray-200",
  offline: "bg-gray-50 text-gray-600 border-gray-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  suspended: "bg-red-50 text-red-700 border-red-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  refunded: "bg-orange-50 text-orange-700 border-orange-200",
  expired: "bg-red-50 text-red-700 border-red-200",
  sent: "bg-blue-50 text-blue-700 border-blue-200",
};

export function StatusBadge({ status }: { status: string }) {
  const label = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const style = statusStyles[status] || "bg-gray-50 text-gray-600 border-gray-200";

  return (
    <Badge variant="outline" className={`text-xs font-medium capitalize ${style}`}>
      {label}
    </Badge>
  );
}
