'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowDownRight,
} from 'lucide-react';
import TransactionDetailsDialog from './TransactionDetailsDialog';
import { TableSkeleton, StatsCardsSkeleton } from '@/components/shared/skeletons';

type Transaction = {
  id: string;
  user: string;
  email: string;
  type: 'Payment' | 'Refund' | 'Payout';
  amount: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  method: string;
};

const financeSummary = [
  {
    label: 'Total Revenue',
    value: '$45,230',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100',
  },
  {
    label: 'Total Refunds',
    value: '$3,120',
    change: '-4.2%',
    trend: 'down',
    icon: ArrowDownRight,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-100',
  },
  {
    label: 'Net Income',
    value: '$42,110',
    change: '+8.1%',
    trend: 'up',
    icon: TrendingUp,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
  },
  {
    label: 'Pending Payouts',
    value: '$5,430',
    change: '+2.3%',
    trend: 'up',
    icon: TrendingDown,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100',
  },
];

const allTransactions: Transaction[] = [
  {
    id: '#TXN001',
    user: 'John Smith',
    email: 'john@example.com',
    type: 'Payment',
    amount: '$1,120',
    date: '12-01-2026',
    status: 'Completed',
    method: 'Credit Card',
  },
  {
    id: '#TXN002',
    user: 'Jane Doe',
    email: 'jane@example.com',
    type: 'Refund',
    amount: '$230',
    date: '13-01-2026',
    status: 'Completed',
    method: 'Bank Transfer',
  },
  {
    id: '#TXN003',
    user: 'Robert Wilson',
    email: 'robert@example.com',
    type: 'Payment',
    amount: '$520',
    date: '14-01-2026',
    status: 'Pending',
    method: 'PayPal',
  },
  {
    id: '#TXN004',
    user: 'Emily Brown',
    email: 'emily@example.com',
    type: 'Payout',
    amount: '$3,450',
    date: '15-01-2026',
    status: 'Completed',
    method: 'Bank Transfer',
  },
  {
    id: '#TXN005',
    user: 'Michael Lee',
    email: 'michael@example.com',
    type: 'Payment',
    amount: '$820',
    date: '16-01-2026',
    status: 'Failed',
    method: 'Credit Card',
  },
  {
    id: '#TXN006',
    user: 'Sarah Davis',
    email: 'sarah@example.com',
    type: 'Payment',
    amount: '$640',
    date: '17-01-2026',
    status: 'Completed',
    method: 'Stripe',
  },
  {
    id: '#TXN007',
    user: 'David Martinez',
    email: 'david@example.com',
    type: 'Refund',
    amount: '$150',
    date: '18-01-2026',
    status: 'Pending',
    method: 'Credit Card',
  },
  {
    id: '#TXN008',
    user: 'Lisa Anderson',
    email: 'lisa@example.com',
    type: 'Payment',
    amount: '$1,340',
    date: '19-01-2026',
    status: 'Completed',
    method: 'Stripe',
  },
  {
    id: '#TXN009',
    user: 'Chris Taylor',
    email: 'chris@example.com',
    type: 'Payment',
    amount: '$1,680',
    date: '20-01-2026',
    status: 'Completed',
    method: 'Credit Card',
  },
  {
    id: '#TXN010',
    user: 'Amanda Clark',
    email: 'amanda@example.com',
    type: 'Refund',
    amount: '$490',
    date: '21-01-2026',
    status: 'Completed',
    method: 'PayPal',
  },
  {
    id: '#TXN011',
    user: 'Kevin White',
    email: 'kevin@example.com',
    type: 'Payment',
    amount: '$760',
    date: '22-01-2026',
    status: 'Pending',
    method: 'Bank Transfer',
  },
  {
    id: '#TXN012',
    user: 'Rachel Green',
    email: 'rachel@example.com',
    type: 'Payout',
    amount: '$2,100',
    date: '23-01-2026',
    status: 'Completed',
    method: 'Bank Transfer',
  },
  {
    id: '#TXN013',
    user: 'Thomas Moore',
    email: 'thomas@example.com',
    type: 'Payment',
    amount: '$580',
    date: '24-01-2026',
    status: 'Failed',
    method: 'Credit Card',
  },
  {
    id: '#TXN014',
    user: 'Olivia Harris',
    email: 'olivia@example.com',
    type: 'Payment',
    amount: '$920',
    date: '25-01-2026',
    status: 'Completed',
    method: 'Stripe',
  },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-green-50 text-green-600',
  Pending: 'bg-orange-50 text-orange-500',
  Failed: 'bg-red-50 text-red-500',
};

const typeColors: Record<string, string> = {
  Payment: 'text-green-600',
  Refund: 'text-red-500',
  Payout: 'text-blue-500',
};

export default function PaymentsList() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = allTransactions.filter(
    (t) =>
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <StatsCardsSkeleton />
        <TableSkeleton columns={8} rows={8} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Finance Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {financeSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
            >
              <div
                className={`flex size-10 items-center justify-center rounded-full ${item.iconBg}`}
              >
                <Icon className={`size-5 ${item.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-semibold text-gray-900">{item.value}</p>
                  <span
                    className={`text-xs font-medium ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {/* Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-gray-900">Transaction History</h3>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
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
                <th className="px-4 py-3 font-medium text-gray-700">Txn ID</th>
                <th className="px-4 py-3 font-medium text-gray-700">User</th>
                <th className="px-4 py-3 font-medium text-gray-700">Type</th>
                <th className="px-4 py-3 font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 font-medium text-gray-700">Method</th>
                <th className="px-4 py-3 font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((txn, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">{txn.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gray-900">{txn.user}</p>
                      <p className="text-xs text-gray-500">{txn.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${typeColors[txn.type]}`}>{txn.type}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{txn.amount}</td>
                  <td className="px-4 py-3 text-gray-600">{txn.method}</td>
                  <td className="px-4 py-3 text-gray-600">{txn.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[txn.status]}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedTxn(txn);
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
          {paginated.map((txn, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-gray-900">{txn.id}</span>
                  <span className={`ml-2 text-xs font-medium ${typeColors[txn.type]}`}>
                    {txn.type}
                  </span>
                </div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[txn.status]}`}
                >
                  {txn.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">User</span>
                  <span className="text-gray-900">{txn.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium text-gray-900">{txn.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="text-gray-600">{txn.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-600">{txn.date}</span>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedTxn(txn);
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
          <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:flex-row">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}{' '}
              transactions
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
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
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

      <TransactionDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        transaction={selectedTxn}
      />
    </div>
  );
}
