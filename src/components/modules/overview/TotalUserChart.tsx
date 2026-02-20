'use client';

import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartFilterDropdown, {
  type ChartFilterValue,
} from '@/components/shared/ChartFilterDropdown';

const yearlyData: Record<string, { month: string; users: number }[]> = {
  '2026': [
    { month: 'Jan', users: 35 },
    { month: 'Feb', users: 55 },
    { month: 'Mar', users: 50 },
    { month: 'Apr', users: 85 },
    { month: 'May', users: 70 },
    { month: 'Jun', users: 95 },
    { month: 'Jul', users: 75 },
    { month: 'Aug', users: 60 },
    { month: 'Sep', users: 45 },
    { month: 'Oct', users: 65 },
    { month: 'Nov', users: 80 },
    { month: 'Dec', users: 90 },
  ],
  '2025': [
    { month: 'Jan', users: 30 },
    { month: 'Feb', users: 50 },
    { month: 'Mar', users: 45 },
    { month: 'Apr', users: 80 },
    { month: 'May', users: 65 },
    { month: 'Jun', users: 90 },
    { month: 'Jul', users: 70 },
    { month: 'Aug', users: 55 },
    { month: 'Sep', users: 40 },
    { month: 'Oct', users: 60 },
    { month: 'Nov', users: 75 },
    { month: 'Dec', users: 85 },
  ],
  '2024': [
    { month: 'Jan', users: 20 },
    { month: 'Feb', users: 35 },
    { month: 'Mar', users: 30 },
    { month: 'Apr', users: 55 },
    { month: 'May', users: 45 },
    { month: 'Jun', users: 70 },
    { month: 'Jul', users: 50 },
    { month: 'Aug', users: 40 },
    { month: 'Sep', users: 35 },
    { month: 'Oct', users: 45 },
    { month: 'Nov', users: 55 },
    { month: 'Dec', users: 65 },
  ],
  '2023': [
    { month: 'Jan', users: 10 },
    { month: 'Feb', users: 20 },
    { month: 'Mar', users: 15 },
    { month: 'Apr', users: 35 },
    { month: 'May', users: 25 },
    { month: 'Jun', users: 50 },
    { month: 'Jul', users: 30 },
    { month: 'Aug', users: 25 },
    { month: 'Sep', users: 20 },
    { month: 'Oct', users: 30 },
    { month: 'Nov', users: 40 },
    { month: 'Dec', users: 45 },
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

const dayLabels = Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`);

function generateDailyData(monthIndex: number, _year: string) {
  const daysInMonth = new Date(Number(_year), monthIndex + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    month: `${i + 1}`,
    users: Math.floor(Math.random() * 15) + 5,
  }));
}

function generateCustomRangeData(from: Date, to: Date) {
  const days: { month: string; users: number }[] = [];
  const current = new Date(from);
  while (current <= to) {
    days.push({
      month: `${current.getDate()}/${current.getMonth() + 1}`,
      users: Math.floor(Math.random() * 15) + 5,
    });
    current.setDate(current.getDate() + 1);
  }
  return days;
}

export default function TotalUserChart() {
  const [filter, setFilter] = useState<ChartFilterValue>({
    type: 'year',
    year: '2025',
  });

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

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Total User</h3>
        <ChartFilterDropdown value={filter} onChange={setFilter} />
      </div>

      <div className="h-62.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D54B46" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#D54B46" stopOpacity={0.02} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="users"
              stroke="#D54B46"
              strokeWidth={2}
              fill="url(#userGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
