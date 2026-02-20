'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Calendar, DollarSign, User, Mail, Hash } from 'lucide-react';

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

interface BookingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
}

const statusStyles: Record<string, string> = {
  Completed: 'bg-green-50 text-green-600 border-green-200',
  Pending: 'bg-orange-50 text-orange-500 border-orange-200',
  Cancelled: 'bg-red-50 text-red-500 border-red-200',
};

export default function BookingDetailsDialog({
  open,
  onOpenChange,
  booking,
}: BookingDetailsDialogProps) {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Booking Details
            <span
              className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${statusStyles[booking.status]}`}
            >
              {booking.status}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Booking ID */}
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-gray-200">
              <Hash className="size-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Booking ID</p>
              <p className="font-semibold text-gray-900">{booking.id}</p>
            </div>
          </div>

          {/* Guest Info */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-blue-50">
                <User className="size-4 text-blue-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Guest</p>
                <p className="truncate font-medium text-gray-900">{booking.guest}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-purple-50">
                <Mail className="size-4 text-purple-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="truncate font-medium text-gray-900">{booking.email}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-green-50">
              <MapPin className="size-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{booking.location}</p>
            </div>
          </div>

          {/* Dates & Price */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-orange-50">
                <Calendar className="size-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Check In</p>
                <p className="text-sm font-medium text-gray-900">{booking.checkIn}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-orange-50">
                <Calendar className="size-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Check Out</p>
                <p className="text-sm font-medium text-gray-900">{booking.checkOut}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-emerald-50">
                <DollarSign className="size-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-sm font-semibold text-gray-900">{booking.price}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
