'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { month: 'Jan', users: 30 },
  { month: 'Feb', users: 50 },
  { month: 'Mar', users: 45 },
  { month: 'Apr', users: 80 },
  { month: 'May', users: 65 },
  { month: 'Jun', users: 90 },
  { month: 'July', users: 70 },
  { month: 'Augst', users: 55 },
  { month: 'Sep', users: 40 },
  { month: 'Oct', users: 60 },
  { month: 'Nov', users: 75 },
  { month: 'Dec', users: 85 },
];

export default function TotalUserChart() {
  const [year, setYear] = useState('2025');
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Total User</h3>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50"
          >
            {year}
            <ChevronDown className="size-4" />
          </button>
          {open && (
            <div className="absolute top-full right-0 z-10 mt-1 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              {['2025', '2024', '2023'].map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    setYear(y);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-1.5 text-left text-sm hover:bg-gray-50"
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-[250px] w-full">
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
