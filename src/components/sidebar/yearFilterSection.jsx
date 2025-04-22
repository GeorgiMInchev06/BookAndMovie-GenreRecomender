'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function YearFilterSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [fromYear, setFromYear] = useState(searchParams.get('fromYear') || '');
  const [toYear, setToYear] = useState(searchParams.get('toYear') || '');

  const handleApply = () => {
    const from = parseInt(fromYear);
    const to = parseInt(toYear);

    // ✅ Проверка: валидни години и >= 1900
    if (
        (!from || from < 1900 || from > 2025) || 
        (!to || to < 1900 || to > 2025) || 
        from > to
      ) return;
      

    const params = new URLSearchParams(searchParams.toString());
    params.set('fromYear', from);
    params.set('toYear', to);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <div>
        <label className="block text-sm font-medium mb-1">From</label>
        <input
          type="number"
          min={1900}
          max={2025}
          placeholder="e.g. 2005"
          value={fromYear}
          onChange={(e) => setFromYear(e.target.value)}
          className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">To</label>
        <input
          type="number"
          min={1900}
          max={2025}
          placeholder="e.g. 2020"
          value={toYear}
          onChange={(e) => setToYear(e.target.value)}
          className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <button
        onClick={handleApply}
        disabled={
            !fromYear ||
            !toYear ||
            parseInt(fromYear) < 1900 ||
            parseInt(fromYear) > 2025 ||
            parseInt(toYear) < 1900 ||
            parseInt(toYear) > 2025 ||
            parseInt(fromYear) > parseInt(toYear)
          }
        className="mt-2 w-full text-sm bg-slate-700 hover:bg-slate-900 text-white py-1.5 rounded-md transition disabled:bg-gray-400"
      >
        Apply
      </button>
    </div>
  );
}
