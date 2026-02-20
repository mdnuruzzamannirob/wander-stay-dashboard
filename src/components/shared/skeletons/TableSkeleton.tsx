'use client';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export default function TableSkeleton({ columns = 6, rows = 8 }: TableSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Search skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Desktop Table skeleton */}
      <div className="hidden rounded-xl border border-gray-200 bg-white md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-gray-50 last:border-0">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    <div
                      className="animate-pulse rounded bg-gray-100"
                      style={{
                        height: colIdx === 1 ? '2rem' : '1rem',
                        width: colIdx === 0 ? '60px' : colIdx === 1 ? '140px' : '80px',
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards skeleton */}
      <div className="space-y-3 md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex justify-between">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
