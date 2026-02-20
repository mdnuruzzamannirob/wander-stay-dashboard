'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import type { DateRange } from 'react-day-picker';

export type FilterType = 'month' | 'year' | 'custom';

export type ChartFilterValue = {
  type: FilterType;
  year?: string;
  month?: string;
  dateRange?: { from: Date; to: Date };
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = ['2026', '2025', '2024', '2023'];

interface ChartFilterDropdownProps {
  value: ChartFilterValue;
  onChange: (value: ChartFilterValue) => void;
}

export default function ChartFilterDropdown({ value, onChange }: ChartFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterType>(value.type);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    value.dateRange ? { from: value.dateRange.from, to: value.dateRange.to } : undefined,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplayLabel = () => {
    if (value.type === 'month' && value.month && value.year) {
      return `${value.month.slice(0, 3)} ${value.year}`;
    }
    if (value.type === 'year' && value.year) {
      return value.year;
    }
    if (value.type === 'custom' && value.dateRange) {
      const fmt = (d: Date) =>
        `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
      return `${fmt(value.dateRange.from)} - ${fmt(value.dateRange.to)}`;
    }
    return 'Select period';
  };

  const handleMonthSelect = (month: string) => {
    onChange({ type: 'month', month, year: value.year || '2026' });
    setOpen(false);
  };

  const handleYearSelect = (year: string) => {
    if (activeTab === 'year') {
      onChange({ type: 'year', year });
      setOpen(false);
    } else {
      onChange({ ...value, year });
    }
  };

  const handleApplyCustomRange = () => {
    if (dateRange?.from && dateRange?.to) {
      onChange({
        type: 'custom',
        dateRange: { from: dateRange.from, to: dateRange.to },
      });
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50"
      >
        <CalendarIcon className="size-3.5" />
        <span className="max-w-35 truncate">{getDisplayLabel()}</span>
        <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 z-20 mt-1.5 w-auto min-w-65 rounded-xl border border-gray-200 bg-white shadow-lg">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {(['month', 'year', 'custom'] as FilterType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2.5 text-xs font-medium capitalize transition ${
                  activeTab === tab
                    ? 'border-primary text-primary border-b-2'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-3">
            {/* Year selector (shared by month and year tabs) */}
            {(activeTab === 'month' || activeTab === 'year') && (
              <div className="mb-3">
                <p className="mb-1.5 text-xs font-medium text-gray-500">Year</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => handleYearSelect(y)}
                      className={`rounded-md px-3 py-1.5 text-sm transition ${
                        (value.year || '2026') === y
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Month grid */}
            {activeTab === 'month' && (
              <div>
                <p className="mb-1.5 text-xs font-medium text-gray-500">Month</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {months.map((m) => (
                    <button
                      key={m}
                      onClick={() => handleMonthSelect(m)}
                      className={`rounded-md px-2 py-1.5 text-xs transition ${
                        value.month === m && value.type === 'month'
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {m.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom date range */}
            {activeTab === 'custom' && (
              <div className="space-y-3">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                  className="rounded-md border border-gray-100"
                />
                <Button
                  size="sm"
                  onClick={handleApplyCustomRange}
                  disabled={!dateRange?.from || !dateRange?.to}
                  className="w-full"
                >
                  Apply Range
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
