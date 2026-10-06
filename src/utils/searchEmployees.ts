import type { CATEGORIES, Employee } from '../types';

export function normalizeQuery(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('ru').replace(/ё/g, 'е');
}

const categoryFields = {
  fullName: 'fullNameRus',
  position: 'positionTitle',
  department: 'departmentName',
} as const;

// Локальная замена поиска на сервере. Ищем только в выбранной категории.
export function searchEmployees(
  employees: Employee[], value: string, category: CATEGORIES,
): Employee[] {
  const query = normalizeQuery(value);
  if (!query) return [];
  const words = query.split(' ');
  return employees.filter((employee) => {
    const text = normalizeQuery(employee[categoryFields[category]]);
    return words.every((word) => text.includes(word));
  });
}
