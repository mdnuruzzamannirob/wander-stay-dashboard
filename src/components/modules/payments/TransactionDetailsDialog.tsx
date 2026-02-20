'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Hash, User, Mail, CreditCard, Calendar, DollarSign } from 'lucide-react';

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

interface TransactionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

const statusStyles: Record<string, string> = {
  Completed: 'bg-green-50 text-green-600 border-green-200',
  Pending: 'bg-orange-50 text-orange-500 border-orange-200',
  Failed: 'bg-red-50 text-red-500 border-red-200',
};

const typeStyles: Record<string, string> = {
  Payment: 'bg-green-50 text-green-600 border-green-200',
  Refund: 'bg-red-50 text-red-500 border-red-200',
  Payout: 'bg-blue-50 text-blue-500 border-blue-200',
};

export default function TransactionDetailsDialog({
  open,
  onOpenChange,
  transaction,
}: TransactionDetailsDialogProps) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Transaction Details
            <span
              className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${statusStyles[transaction.status]}`}
            >
              {transaction.status}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Transaction ID & Type */}
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-gray-200">
                <Hash className="size-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Transaction ID</p>
                <p className="font-semibold text-gray-900">{transaction.id}</p>
              </div>
            </div>
            <span
              className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${typeStyles[transaction.type]}`}
            >
              {transaction.type}
            </span>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-blue-50">
                <User className="size-4 text-blue-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">User</p>
                <p className="truncate text-sm font-medium text-gray-900">{transaction.user}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-purple-50">
                <Mail className="size-4 text-purple-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="truncate text-sm font-medium text-gray-900">{transaction.email}</p>
              </div>
            </div>
          </div>

          {/* Amount, Method, Date */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-emerald-50">
                <DollarSign className="size-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-sm font-semibold text-gray-900">{transaction.amount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-orange-50">
                <CreditCard className="size-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Method</p>
                <p className="text-sm font-medium text-gray-900">{transaction.method}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-gray-100">
                <Calendar className="size-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-900">{transaction.date}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
