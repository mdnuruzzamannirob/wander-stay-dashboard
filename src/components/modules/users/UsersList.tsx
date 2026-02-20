'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Eye, Ban, MoreVertical } from 'lucide-react';
import UserDetailsDialog from './UserDetailsDialog';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { TableSkeleton } from '@/components/shared/skeletons';

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
  {
    id: '#U009',
    name: 'Chris Taylor',
    email: 'chris@example.com',
    phone: '+1 234 567 8909',
    joinDate: '18-11-2025',
    status: 'Active',
    totalBookings: 9,
  },
  {
    id: '#U010',
    name: 'Amanda Clark',
    email: 'amanda@example.com',
    phone: '+1 234 567 8910',
    joinDate: '25-11-2025',
    status: 'Inactive',
    totalBookings: 2,
  },
  {
    id: '#U011',
    name: 'Kevin White',
    email: 'kevin@example.com',
    phone: '+1 234 567 8911',
    joinDate: '02-12-2025',
    status: 'Active',
    totalBookings: 11,
  },
  {
    id: '#U012',
    name: 'Rachel Green',
    email: 'rachel@example.com',
    phone: '+1 234 567 8912',
    joinDate: '10-12-2025',
    status: 'Active',
    totalBookings: 7,
  },
  {
    id: '#U013',
    name: 'Thomas Moore',
    email: 'thomas@example.com',
    phone: '+1 234 567 8913',
    joinDate: '15-12-2025',
    status: 'Blocked',
    totalBookings: 0,
  },
  {
    id: '#U014',
    name: 'Olivia Harris',
    email: 'olivia@example.com',
    phone: '+1 234 567 8914',
    joinDate: '22-12-2025',
    status: 'Active',
    totalBookings: 14,
  },
  {
    id: '#U015',
    name: 'Daniel Kim',
    email: 'daniel@example.com',
    phone: '+1 234 567 8915',
    joinDate: '01-01-2026',
    status: 'Active',
    totalBookings: 5,
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) return <TableSkeleton columns={7} rows={8} />;

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
      <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white md:block">
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
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setDetailsOpen(true);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          <Eye className="size-3.5" /> View Details
                        </button>
                        <button
                          onClick={() => {
                            setUserToBlock(user);
                            setBlockDialogOpen(true);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
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
          <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4">
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
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setDetailsOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <Eye className="size-3.5" /> View
              </button>
              <button
                onClick={() => {
                  setUserToBlock(user);
                  setBlockDialogOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
              >
                <Ban className="size-3.5" /> Block
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:flex-row">
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

      <UserDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} user={selectedUser} />

      <ConfirmDialog
        open={blockDialogOpen}
        onOpenChange={setBlockDialogOpen}
        title="Block User"
        description={`Are you sure you want to block ${userToBlock?.name ?? 'this user'}? They will no longer be able to access their account.`}
        confirmLabel="Block User"
        variant="destructive"
        onConfirm={() => {
          // TODO: Call block user API
          setBlockDialogOpen(false);
          setUserToBlock(null);
        }}
      />
    </div>
  );
}
