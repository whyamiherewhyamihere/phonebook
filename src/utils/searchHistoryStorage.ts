import type { SearchHistoryEntry } from '../types';

export function saveSearchHistory(history: SearchHistoryEntry[]) {
  try {
    const historyText = JSON.stringify(history);

    localStorage.setItem('phonebookSearchHistory', historyText);
  } catch {
    console.warn('Не удалось сохранить историю поиска.');
  }
}

export function loadSearchHistory(): SearchHistoryEntry[] {
  try {
    const historyText = localStorage.getItem('phonebookSearchHistory');

    if (historyText === null) {
      return [];
    }

    const data: unknown = JSON.parse(historyText);

    if (!Array.isArray(data)) {
      return [];
    }

    const history: SearchHistoryEntry[] = [];

    for (const entry of data) {
      if (entry === null || typeof entry !== 'object') {
        continue;
      }

      if (typeof entry.value !== 'string') {
        continue;
      }

      const value = entry.value.trim().replace(/\s+/g, ' ');

      if (value.length < 3) {
        continue;
      }

      if (
        entry.category !== 'fullName' &&
        entry.category !== 'position' &&
        entry.category !== 'department'
      ) {
        continue;
      }

      if (typeof entry.createdAt !== 'string') {
        continue;
      }

      const date = new Date(entry.createdAt);

      if (Number.isNaN(date.getTime())) {
        continue;
      }

      history.push({
        value: value,
        category: entry.category,
        createdAt: entry.createdAt,
      });
    }

    return history.slice(0, 5);
  } catch {
    return [];
  }
}