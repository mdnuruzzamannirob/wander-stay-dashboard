'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Mail, Calendar, MessageSquare } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Read' | 'Unread';
};

interface MessageViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: Message | null;
}

const statusStyles: Record<string, string> = {
  Read: 'bg-gray-100 text-gray-500 border-gray-200',
  Unread: 'bg-blue-50 text-blue-600 border-blue-200',
};

export default function MessageViewDialog({ open, onOpenChange, message }: MessageViewDialogProps) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-130">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Message Details
            <span
              className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${statusStyles[message.status]}`}
            >
              {message.status}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Sender Info */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-blue-50">
                <User className="size-4 text-blue-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Sender</p>
                <p className="truncate text-sm font-medium text-gray-900">{message.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-purple-50">
                <Mail className="size-4 text-purple-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="truncate text-sm font-medium text-gray-900">{message.email}</p>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-orange-50">
              <Calendar className="size-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium text-gray-900">{message.date}</p>
            </div>
          </div>

          {/* Subject */}
          <div className="rounded-lg border border-gray-100 p-3">
            <div className="mb-1 flex items-center gap-2">
              <MessageSquare className="size-4 text-gray-400" />
              <p className="text-xs font-medium text-gray-500">Subject</p>
            </div>
            <p className="font-medium text-gray-900">{message.subject}</p>
          </div>

          {/* Message body */}
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="mb-1 text-xs font-medium text-gray-500">Message</p>
            <p className="leading-relaxed text-gray-700">{message.message}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
