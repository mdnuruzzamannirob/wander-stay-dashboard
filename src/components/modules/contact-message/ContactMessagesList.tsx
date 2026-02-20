'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Eye, Trash2, Mail } from 'lucide-react';
import MessageViewDialog from './MessageViewDialog';
import MessageReplyDialog from './MessageReplyDialog';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { TableSkeleton } from '@/components/shared/skeletons';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Read' | 'Unread';
};

const allMessages: Message[] = [
  {
    id: '#M001',
    name: 'John Smith',
    email: 'john@example.com',
    subject: 'Issue with booking',
    message: 'I am having trouble with my recent booking. The confirmation email...',
    date: '12-01-2026',
    status: 'Unread',
  },
  {
    id: '#M002',
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Refund request',
    message: 'I would like to request a refund for my cancelled booking...',
    date: '13-01-2026',
    status: 'Read',
  },
  {
    id: '#M003',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    subject: 'Hotel complaint',
    message: 'The hotel room was not as described in the listing...',
    date: '14-01-2026',
    status: 'Unread',
  },
  {
    id: '#M004',
    name: 'Emily Brown',
    email: 'emily@example.com',
    subject: 'Payment issue',
    message: 'My payment was deducted twice for the same booking...',
    date: '15-01-2026',
    status: 'Read',
  },
  {
    id: '#M005',
    name: 'Michael Lee',
    email: 'michael@example.com',
    subject: 'Feature suggestion',
    message: 'It would be great if you could add a map view for hotels...',
    date: '16-01-2026',
    status: 'Read',
  },
  {
    id: '#M006',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    subject: 'Account verification',
    message: 'I am unable to verify my account. The OTP is not being sent...',
    date: '17-01-2026',
    status: 'Unread',
  },
  {
    id: '#M007',
    name: 'David Martinez',
    email: 'david@example.com',
    subject: 'Partnership inquiry',
    message: 'We are interested in listing our hotel chain on your platform...',
    date: '18-01-2026',
    status: 'Read',
  },
  {
    id: '#M008',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    subject: 'Booking modification',
    message: 'I need to change my check-in date from January 19 to January 21...',
    date: '19-01-2026',
    status: 'Unread',
  },
  {
    id: '#M009',
    name: 'Chris Taylor',
    email: 'chris@example.com',
    subject: 'Loyalty program question',
    message: 'How do I earn points on my bookings? I could not find info...',
    date: '20-01-2026',
    status: 'Read',
  },
  {
    id: '#M010',
    name: 'Amanda Clark',
    email: 'amanda@example.com',
    subject: 'Check-in assistance',
    message: 'I will be arriving late at night. Can I still check in after midnight?',
    date: '21-01-2026',
    status: 'Unread',
  },
  {
    id: '#M011',
    name: 'Kevin White',
    email: 'kevin@example.com',
    subject: 'Review removal request',
    message: 'I left a negative review by mistake. Can you help me update it?',
    date: '22-01-2026',
    status: 'Read',
  },
  {
    id: '#M012',
    name: 'Rachel Green',
    email: 'rachel@example.com',
    subject: 'Group booking discount',
    message: 'We have a group of 20 people traveling together. Do you offer discounts?',
    date: '23-01-2026',
    status: 'Unread',
  },
  {
    id: '#M013',
    name: 'Thomas Moore',
    email: 'thomas@example.com',
    subject: 'Technical issue',
    message: 'The mobile app keeps crashing when I try to view my upcoming reservations...',
    date: '24-01-2026',
    status: 'Unread',
  },
  {
    id: '#M014',
    name: 'Olivia Harris',
    email: 'olivia@example.com',
    subject: 'Gift card inquiry',
    message: 'Do you offer gift cards that can be used for hotel bookings?',
    date: '25-01-2026',
    status: 'Read',
  },
];

const statusColors: Record<string, string> = {
  Read: 'bg-gray-100 text-gray-500',
  Unread: 'bg-blue-50 text-blue-600',
};

export default function ContactMessagesList() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = allMessages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) return <TableSkeleton columns={6} rows={8} />;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
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
              <th className="px-4 py-3 font-medium text-gray-700">ID</th>
              <th className="px-4 py-3 font-medium text-gray-700">Sender</th>
              <th className="px-4 py-3 font-medium text-gray-700">Subject</th>
              <th className="px-4 py-3 font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((msg, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">{msg.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-gray-900">{msg.name}</p>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                  </div>
                </td>
                <td className="max-w-50 truncate px-4 py-3 text-gray-600">{msg.subject}</td>
                <td className="px-4 py-3 text-gray-600">{msg.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[msg.status]}`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setSelectedMessage(msg);
                        setViewOpen(true);
                      }}
                      className="hover:text-primary rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100"
                    >
                      <Eye className="size-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMessage(msg);
                        setReplyOpen(true);
                      }}
                      className="rounded-md p-1.5 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"
                    >
                      <Mail className="size-4" />
                    </button>
                    <button
                      onClick={() => {
                        setMessageToDelete(msg);
                        setDeleteOpen(true);
                      }}
                      className="rounded-md p-1.5 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {paginated.map((msg, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">{msg.name}</p>
                <p className="text-xs text-gray-500">{msg.email}</p>
              </div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[msg.status]}`}
              >
                {msg.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium text-gray-800">{msg.subject}</p>
                <p className="mt-0.5 line-clamp-2 text-gray-500">{msg.message}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="text-gray-600">{msg.date}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedMessage(msg);
                  setViewOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <Eye className="size-3.5" /> View
              </button>
              <button
                onClick={() => {
                  setSelectedMessage(msg);
                  setReplyOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-md border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-500 transition hover:bg-blue-50"
              >
                <Mail className="size-3.5" /> Reply
              </button>
              <button
                onClick={() => {
                  setMessageToDelete(msg);
                  setDeleteOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
              >
                <Trash2 className="size-3.5" /> Delete
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
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} messages
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

      <MessageViewDialog open={viewOpen} onOpenChange={setViewOpen} message={selectedMessage} />

      <MessageReplyDialog open={replyOpen} onOpenChange={setReplyOpen} message={selectedMessage} />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Message"
        description={`Are you sure you want to delete the message from ${messageToDelete?.name ?? 'this sender'}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          // TODO: Call delete message API
          setDeleteOpen(false);
          setMessageToDelete(null);
        }}
      />
    </div>
  );
}
