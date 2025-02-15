// components/GlobalDateRange.tsx
'use client';

import { useState, createContext, useContext } from 'react';

type DateRange = 'week' | 'month' | 'year';
const DateRangeContext = createContext<{
  range: DateRange;
  setRange: (range: DateRange) => void;
}>({
  range: 'week',
  setRange: () => {},
});

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange>('week');
  return (
    <DateRangeContext.Provider value={{ range, setRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export const useDateRange = () => useContext(DateRangeContext);
