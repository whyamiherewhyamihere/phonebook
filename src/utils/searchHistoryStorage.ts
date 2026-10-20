import type { SearchHistoryEntry } from '../types';

export function saveSearchHistory(history: SearchHistoryEntry[]) {
  try {
    const historyText = JSON.stringify(history);

    localStorage.setItem('phonebookSearchHistory', historyText);
  } catch {
    console.warn('Не удалось сохранить историю поиска.');
  }
}