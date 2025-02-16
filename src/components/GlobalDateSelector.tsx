// components/GlobalDateSelector.tsx
'use client';

import { DateRange, useDateRange } from './GlobalDateRange';
import { format } from 'date-fns';

export default function GlobalDateSelector() {
  const { range, setRange } = useDateRange();

  // Calculate dates based on range
  const getDateRange = () => {
    const today = new Date();
    const startDate = new Date();

    switch (range) {
      case 'week':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
    }

    return {
      start: format(startDate, 'MMM dd, yyyy'),
      end: format(today, 'MMM dd, yyyy'),
    };
  };

  const { start, end } = getDateRange();
  const ranges = [
    { label: 'Last 7 Days', value: 'week' as DateRange },
    { label: 'Last 30 Days', value: 'month' as DateRange },
    { label: 'Last Year', value: 'year' as DateRange },
  ];

  return (
    <div className="flex gap-2 items-center mb-6">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-600">View trends for:</span>
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                range === r.value
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <span className="text-sm text-gray-500 ml-4">
        ({start} - {end})
      </span>
    </div>
  );
}
