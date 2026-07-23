"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
      <p className="text-muted-foreground">{error.message || "An unexpected error occurred."}</p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/admin/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
