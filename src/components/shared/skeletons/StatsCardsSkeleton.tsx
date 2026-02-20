'use client';

export default function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="size-12 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
