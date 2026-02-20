'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Mail, Phone, Calendar, BookOpen } from 'lucide-react';

type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Blocked';
  totalBookings: number;
};

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserData | null;
}

const statusStyles: Record<string, string> = {
  Active: 'bg-green-50 text-green-600 border-green-200',
  Inactive: 'bg-gray-100 text-gray-500 border-gray-200',
  Blocked: 'bg-red-50 text-red-500 border-red-200',
};

export default function UserDetailsDialog({ open, onOpenChange, user }: UserDetailsDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            User Details
            <span
              className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${statusStyles[user.status]}`}
            >
              {user.status}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User avatar + name */}
          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
            <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-full">
              <User className="size-7" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.id}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-blue-50">
                <Mail className="size-4 text-blue-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="truncate text-sm font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-green-50">
                <Phone className="size-4 text-green-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="truncate text-sm font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-orange-50">
                <Calendar className="size-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-sm font-medium text-gray-900">{user.joinDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-purple-50">
                <BookOpen className="size-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Bookings</p>
                <p className="text-sm font-semibold text-gray-900">{user.totalBookings}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
