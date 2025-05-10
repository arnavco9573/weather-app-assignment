import { useState } from 'react';

type SortDirection = 'asc' | 'desc';

export const useSortableTable = <T,>(initialData: T[]) => {
  const [sortedData, setSortedData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: SortDirection;
  } | null>(null);

  const requestSort = (key: keyof T) => {
    let direction: SortDirection = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...initialData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
  };

  return { sortedData, requestSort, sortConfig };
};