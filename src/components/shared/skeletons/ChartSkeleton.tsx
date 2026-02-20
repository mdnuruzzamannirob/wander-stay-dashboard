'use client';

export default function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-28 animate-pulse rounded-lg bg-gray-200" />
      </div>
      <div className="flex h-64 items-end gap-2 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 animate-pulse rounded-t bg-gray-100"
            style={{
              height: `${Math.random() * 60 + 20}%`,
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-3 w-14 animate-pulse rounded bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
