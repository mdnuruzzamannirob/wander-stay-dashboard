'use client';

import { DollarSign, Users, Hotel, CalendarCheck } from 'lucide-react';

const stats = [
  {
    label: 'Revenue',
    value: '$2,230',
    icon: DollarSign,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100',
  },
  {
    label: 'Total Users',
    value: '1,230',
    icon: Users,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
  },
  {
    label: 'Active Hotel',
    value: '600',
    icon: Hotel,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100',
  },
  {
    label: 'Total Bookings',
    value: '250',
    icon: CalendarCheck,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-100',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className={`flex size-10 items-center justify-center rounded-full ${stat.iconBg}`}>
              <Icon className={`size-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
