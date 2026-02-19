'use client';

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Eye, Ban, MoreVertical } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Blocked';
  totalBookings: number;
};

const allUsers: User[] = [
  {
    id: '#U001',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 234 567 8901',
    joinDate: '01-06-2025',
    status: 'Active',
    totalBookings: 12,
  },
  {
    id: '#U002',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1 234 567 8902',
    joinDate: '15-07-2025',
    status: 'Active',
    totalBookings: 8,
  },
  {
    id: '#U003',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    phone: '+1 234 567 8903',
    joinDate: '20-08-2025',
    status: 'Inactive',
    totalBookings: 3,
  },
  {
    id: '#U004',
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '+1 234 567 8904',
    joinDate: '05-09-2025',
    status: 'Active',
    totalBookings: 15,
  },
  {
    id: '#U005',
    name: 'Michael Lee',
    email: 'michael@example.com',
    phone: '+1 234 567 8905',
    joinDate: '12-10-2025',
    status: 'Blocked',
    totalBookings: 1,
  },
  {
    id: '#U006',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    phone: '+1 234 567 8906',
    joinDate: '22-10-2025',
    status: 'Active',
    totalBookings: 6,
  },
  {
    id: '#U007',
    name: 'David Martinez',
    email: 'david@example.com',
    phone: '+1 234 567 8907',
    joinDate: '01-11-2025',
    status: 'Inactive',
    totalBookings: 4,
  },
  {
    id: '#U008',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    phone: '+1 234 567 8908',
    joinDate: '10-11-2025',
    status: 'Active',
    totalBookings: 20,
  },
];

const statusColors: Record<string, string> = {
  Active: 'bg-green-50 text-green-600',
  Inactive: 'bg-gray-100 text-gray-500',
  Blocked: 'bg-red-50 text-red-500',
};

export default function UsersList() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemsPerPage = 5;

  const filtered = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition outline-none focus:ring-1"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">User ID</th>
              <th className="px-4 py-3 font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 font-medium text-gray-700">Phone</th>
              <th className="px-4 py-3 font-medium text-gray-700">Join Date</th>
              <th className="px-4 py-3 font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 font-medium text-gray-700">Bookings</th>
              <th className="px-4 py-3 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((user, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">{user.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.phone}</td>
                <td className="px-4 py-3 text-gray-600">{user.joinDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.totalBookings}</td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                      className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100"
                    >
                      <MoreVertical className="size-4" />
                    </button>
                    {openMenuId === user.id && (
                      <div className="absolute right-0 z-10 mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                          <Eye className="size-3.5" /> View Details
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                          <Ban className="size-3.5" /> Block User
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {paginated.map((user, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[user.status]}`}
              >
                {user.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">User ID</span>
                <span className="font-medium text-gray-900">{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-600">{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Joined</span>
                <span className="text-gray-600">{user.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bookings</span>
                <span className="font-medium text-gray-900">{user.totalBookings}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
                <Eye className="size-3.5" /> View
              </button>
              <button className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50">
                <Ban className="size-3.5" /> Block
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} users
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`size-8 rounded-md text-sm font-medium transition ${
                  currentPage === page ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
