'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { month: 'Jan', revenue: 40 },
  { month: 'Feb', revenue: 55 },
  { month: 'Mar', revenue: 45 },
  { month: 'Apr', revenue: 50 },
  { month: 'May', revenue: 35 },
  { month: 'Jun', revenue: 60 },
  { month: 'July', revenue: 45 },
  { month: 'Augst', revenue: 50 },
  { month: 'Sep', revenue: 55 },
  { month: 'Oct', revenue: 65 },
  { month: 'Nov', revenue: 90 },
  { month: 'Dec', revenue: 85 },
];

export default function RevenueChart() {
  const [year, setYear] = useState('2025');
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Revenue Overview</h3>
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
