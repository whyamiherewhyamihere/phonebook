import { useEffect, useState } from 'react';

// Вынесено из SearchBar рабочего проекта в отдельный хук.
export function useDebouncedValue(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
