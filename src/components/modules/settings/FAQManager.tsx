'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Save } from 'lucide-react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I create a booking?',
    answer:
      'To create a booking, navigate to the desired hotel listing, select your check-in and check-out dates, choose a room type, and proceed to payment. You will receive a confirmation email once the booking is complete.',
  },
  {
    id: 'faq-2',
    question: 'What is the cancellation policy?',
    answer:
      'Our standard cancellation policy allows free cancellation up to 48 hours before check-in. Cancellations made within 48 hours may incur a fee equivalent to one night stay. Some hotels may have different policies which will be shown during booking.',
  },
  {
    id: 'faq-3',
    question: 'How do refunds work?',
    answer:
      'Refunds are processed within 5-7 business days after a successful cancellation. The refund will be credited back to your original payment method. For partial cancellations, only the cancelled portion will be refunded.',
  },
  {
    id: 'faq-4',
    question: 'Can I modify my booking after confirmation?',
    answer:
      'Yes, you can modify your booking dates, room type, or guest details from the Bookings section. Modifications are subject to availability and may result in price changes.',
  },
  {
    id: 'faq-5',
    question: 'How do I contact customer support?',
    answer:
      'You can reach our customer support team through the Contact Messages section, via email at support@wanderstay.com, or by calling our 24/7 helpline at +1 800 123 4567.',
  },
];

export default function FAQManager() {
  const [faqs, setFAQs] = useState<FAQItem[]>(initialFAQs);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setFAQs((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const addFAQ = () => {
    const newId = `faq-${Date.now()}`;
    setFAQs((prev) => [...prev, { id: newId, question: '', answer: '' }]);
    setExpandedId(newId);
  };

  const removeFAQ = (id: string) => {
    setFAQs((prev) => prev.filter((f) => f.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  return (
    <div className="space-y-6">
      {/* FAQ List */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isExpanded = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-xl border border-gray-200 bg-white transition hover:border-gray-300"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {faq.question || 'New Question'}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="size-4 shrink-0 text-gray-400" />
                ) : (
                  <ChevronDown className="size-4 shrink-0 text-gray-400" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                        placeholder="Enter question..."
                        className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition outline-none focus:ring-1"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Answer
                      </label>
                      <textarea
                        rows={4}
                        value={faq.answer}
                        onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                        placeholder="Enter answer..."
                        className="focus:border-primary focus:ring-primary/30 w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm leading-relaxed transition outline-none focus:ring-1"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => removeFAQ(faq.id)}
                        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={addFAQ}
          className="hover:border-primary hover:text-primary flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-500 transition"
        >
          <Plus className="size-4" />
          Add New FAQ
        </button>

        <button className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition">
          <Save className="size-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
