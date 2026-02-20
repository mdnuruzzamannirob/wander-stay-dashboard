'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChartSkeleton } from '@/components/shared/skeletons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartFilterDropdown, {
  type ChartFilterValue,
} from '@/components/shared/ChartFilterDropdown';

const yearlyData: Record<string, { month: string; revenue: number }[]> = {
  '2026': [
    { month: 'Jan', revenue: 45 },
    { month: 'Feb', revenue: 60 },
    { month: 'Mar', revenue: 50 },
    { month: 'Apr', revenue: 55 },
    { month: 'May', revenue: 40 },
    { month: 'Jun', revenue: 65 },
    { month: 'Jul', revenue: 50 },
    { month: 'Aug', revenue: 55 },
    { month: 'Sep', revenue: 60 },
    { month: 'Oct', revenue: 70 },
    { month: 'Nov', revenue: 95 },
    { month: 'Dec', revenue: 90 },
  ],
  '2025': [
    { month: 'Jan', revenue: 40 },
    { month: 'Feb', revenue: 55 },
    { month: 'Mar', revenue: 45 },
    { month: 'Apr', revenue: 50 },
    { month: 'May', revenue: 35 },
    { month: 'Jun', revenue: 60 },
    { month: 'Jul', revenue: 45 },
    { month: 'Aug', revenue: 50 },
    { month: 'Sep', revenue: 55 },
    { month: 'Oct', revenue: 65 },
    { month: 'Nov', revenue: 90 },
    { month: 'Dec', revenue: 85 },
  ],
  '2024': [
    { month: 'Jan', revenue: 30 },
    { month: 'Feb', revenue: 40 },
    { month: 'Mar', revenue: 35 },
    { month: 'Apr', revenue: 40 },
    { month: 'May', revenue: 25 },
    { month: 'Jun', revenue: 50 },
    { month: 'Jul', revenue: 35 },
    { month: 'Aug', revenue: 40 },
    { month: 'Sep', revenue: 45 },
    { month: 'Oct', revenue: 50 },
    { month: 'Nov', revenue: 70 },
    { month: 'Dec', revenue: 65 },
  ],
  '2023': [
    { month: 'Jan', revenue: 15 },
    { month: 'Feb', revenue: 25 },
    { month: 'Mar', revenue: 20 },
    { month: 'Apr', revenue: 25 },
    { month: 'May', revenue: 15 },
    { month: 'Jun', revenue: 35 },
    { month: 'Jul', revenue: 20 },
    { month: 'Aug', revenue: 25 },
    { month: 'Sep', revenue: 30 },
    { month: 'Oct', revenue: 35 },
    { month: 'Nov', revenue: 50 },
    { month: 'Dec', revenue: 45 },
  ],
};

const monthIndexMap: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function generateDailyData(monthIndex: number, year: string) {
  const daysInMonth = new Date(Number(year), monthIndex + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    month: `${i + 1}`,
    revenue: Math.floor(Math.random() * 20) + 5,
  }));
}

function generateCustomRangeData(from: Date, to: Date) {
  const days: { month: string; revenue: number }[] = [];
  const current = new Date(from);
  while (current <= to) {
    days.push({
      month: `${current.getDate()}/${current.getMonth() + 1}`,
      revenue: Math.floor(Math.random() * 20) + 5,
    });
    current.setDate(current.getDate() + 1);
  }
  return days;
}

export default function RevenueChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<ChartFilterValue>({
    type: 'year',
    year: '2025',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const data = useMemo(() => {
    if (filter.type === 'year') {
      return yearlyData[filter.year || '2025'] || yearlyData['2025'];
    }
    if (filter.type === 'month' && filter.month && filter.year) {
      const mIdx = monthIndexMap[filter.month] ?? 0;
      return generateDailyData(mIdx, filter.year);
    }
    if (filter.type === 'custom' && filter.dateRange) {
      return generateCustomRangeData(filter.dateRange.from, filter.dateRange.to);
    }
    return yearlyData['2025'];
  }, [filter]);

  if (isLoading) return <ChartSkeleton />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Revenue Overview</h3>
        <ChartFilterDropdown value={filter} onChange={setFilter} />
      </div>

      <div className="h-62.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="revenue" fill="#D54B46" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
