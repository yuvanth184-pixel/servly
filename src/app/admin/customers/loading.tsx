export default function Loading() {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="h-8 w-36 mb-2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-52 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-9 w-32 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-10 w-full mb-4 animate-pulse rounded bg-muted" />
      <div className="rounded-xl border border-border bg-card">
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-full animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
