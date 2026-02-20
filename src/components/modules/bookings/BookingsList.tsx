'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import BookingDetailsDialog from './BookingDetailsDialog';
import { TableSkeleton } from '@/components/shared/skeletons';

type Booking = {
  id: string;
  guest: string;
  email: string;
  location: string;
  checkIn: string;
  checkOut: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  price: string;
};

const allBookings: Booking[] = [
  {
    id: '#I5FHM',
    guest: 'John Smith',
    email: 'john@example.com',
    location: '123 Main St, New York',
    checkIn: '12-01-2026',
    checkOut: '15-01-2026',
    status: 'Completed',
    price: '$1,120',
  },
  {
    id: '#O2HHM',
    guest: 'Jane Doe',
    email: 'jane@example.com',
    location: '456 Oak Ave, Los Angeles',
    checkIn: '16-01-2026',
    checkOut: '20-01-2026',
    status: 'Pending',
    price: '$830',
  },
  {
    id: '#I5HHM',
    guest: 'Robert Wilson',
    email: 'robert@example.com',
    location: '789 Pine Rd, Chicago',
    checkIn: '15-01-2026',
    checkOut: '18-01-2026',
    status: 'Completed',
    price: '$520',
  },
  {
    id: '#63DFE',
    guest: 'Emily Brown',
    email: 'emily@example.com',
    location: '321 Elm St, Houston',
    checkIn: '13-01-2026',
    checkOut: '16-01-2026',
    status: 'Cancelled',
    price: '$270',
  },
  {
    id: '#78GHJ',
    guest: 'Michael Lee',
    email: 'michael@example.com',
    location: '555 Maple Dr, Miami',
    checkIn: '14-01-2026',
    checkOut: '19-01-2026',
    status: 'Completed',
    price: '$1,450',
  },
  {
    id: '#92KLM',
    guest: 'Sarah Davis',
    email: 'sarah@example.com',
    location: '777 Cedar Ln, Seattle',
    checkIn: '17-01-2026',
    checkOut: '21-01-2026',
    status: 'Pending',
    price: '$680',
  },
  {
    id: '#45NOP',
    guest: 'David Martinez',
    email: 'david@example.com',
    location: '999 Birch Ct, Denver',
    checkIn: '18-01-2026',
    checkOut: '22-01-2026',
    status: 'Completed',
    price: '$920',
  },
  {
    id: '#11QRS',
    guest: 'Lisa Anderson',
    email: 'lisa@example.com',
    location: '123 Walnut Ave, Boston',
    checkIn: '19-01-2026',
    checkOut: '23-01-2026',
    status: 'Pending',
    price: '$340',
  },
  {
    id: '#55TUV',
    guest: 'Chris Taylor',
    email: 'chris@example.com',
    location: '800 Sunset Blvd, San Francisco',
    checkIn: '20-01-2026',
    checkOut: '24-01-2026',
    status: 'Completed',
    price: '$1,680',
  },
  {
    id: '#77WXY',
    guest: 'Amanda Clark',
    email: 'amanda@example.com',
    location: '42 River Rd, Portland',
    checkIn: '21-01-2026',
    checkOut: '25-01-2026',
    status: 'Cancelled',
    price: '$490',
  },
  {
    id: '#33ZAB',
    guest: 'Kevin White',
    email: 'kevin@example.com',
    location: '210 Broadway, Nashville',
    checkIn: '22-01-2026',
    checkOut: '26-01-2026',
    status: 'Completed',
    price: '$760',
  },
  {
    id: '#88CDE',
    guest: 'Rachel Green',
    email: 'rachel@example.com',
    location: '55 Park Ave, Atlanta',
    checkIn: '23-01-2026',
    checkOut: '27-01-2026',
    status: 'Pending',
    price: '$1,020',
  },
  {
    id: '#66FGH',
    guest: 'Thomas Moore',
    email: 'thomas@example.com',
    location: '333 Lake Dr, Minneapolis',
    checkIn: '24-01-2026',
    checkOut: '28-01-2026',
    status: 'Completed',
    price: '$580',
  },
  {
    id: '#22IJK',
    guest: 'Olivia Harris',
    email: 'olivia@example.com',
    location: '900 Palm St, San Diego',
    checkIn: '25-01-2026',
    checkOut: '29-01-2026',
    status: 'Pending',
    price: '$1,340',
  },
  {
    id: '#44LMN',
    guest: 'Daniel Kim',
    email: 'daniel@example.com',
    location: '78 Ocean Ave, Honolulu',
    checkIn: '26-01-2026',
    checkOut: '30-01-2026',
    status: 'Cancelled',
    price: '$2,100',
  },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-green-50 text-green-600',
  Pending: 'bg-orange-50 text-orange-500',
  Cancelled: 'bg-red-50 text-red-500',
};

export default function BookingsList() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = allBookings.filter(
    (b) =>
      b.guest.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) return <TableSkeleton columns={8} rows={8} />;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
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
              <th className="px-4 py-3 font-medium text-gray-700">Booking ID</th>
              <th className="px-4 py-3 font-medium text-gray-700">Guest</th>
              <th className="px-4 py-3 font-medium text-gray-700">Location</th>
              <th className="px-4 py-3 font-medium text-gray-700">Check In</th>
              <th className="px-4 py-3 font-medium text-gray-700">Check Out</th>
              <th className="px-4 py-3 font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 font-medium text-gray-700">Price</th>
              <th className="px-4 py-3 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((booking, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">{booking.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-gray-900">{booking.guest}</p>
                    <p className="text-xs text-gray-500">{booking.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{booking.location}</td>
                <td className="px-4 py-3 text-gray-600">{booking.checkIn}</td>
                <td className="px-4 py-3 text-gray-600">{booking.checkOut}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{booking.price}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setDetailsOpen(true);
                    }}
                    className="hover:text-primary rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100"
                  >
                    <Eye className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {paginated.map((booking, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">{booking.id}</span>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[booking.status]}`}
              >
                {booking.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Guest</span>
                <span className="text-gray-900">{booking.guest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="text-right text-gray-600">{booking.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Check In</span>
                <span className="text-gray-600">{booking.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Check Out</span>
                <span className="text-gray-600">{booking.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span className="font-medium text-gray-900">{booking.price}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  setSelectedBooking(booking);
                  setDetailsOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <Eye className="size-3.5" /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} bookings
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
      <BookingDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        booking={selectedBooking}
      />
    </div>
  );
}
