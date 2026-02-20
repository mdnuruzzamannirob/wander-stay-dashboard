'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Send } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Read' | 'Unread';
};

interface MessageReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: Message | null;
}

export default function MessageReplyDialog({
  open,
  onOpenChange,
  message,
}: MessageReplyDialogProps) {
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  if (!message) return null;

  const handleSend = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    // Simulate sending (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);
    setReplyText('');
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) setReplyText('');
        onOpenChange(val);
      }}
    >
      <DialogContent className="sm:max-w-130">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            Reply to Message
          </DialogTitle>
          <DialogDescription>
            Replying to <span className="font-medium text-gray-900">{message.name}</span> (
            {message.email})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Original message */}
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="mb-1 text-xs font-medium text-gray-500">Original Message</p>
            <p className="text-sm font-medium text-gray-800">{message.subject}</p>
            <p className="mt-1 text-sm text-gray-600">{message.message}</p>
          </div>

          {/* Reply */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Reply</label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
              rows={5}
              className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition outline-none focus:ring-1"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              setReplyText('');
              onOpenChange(false);
            }}
            disabled={sending}
          >
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending || !replyText.trim()}>
            {sending ? (
              'Sending...'
            ) : (
              <>
                <Send className="size-4" />
                Send Reply
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
