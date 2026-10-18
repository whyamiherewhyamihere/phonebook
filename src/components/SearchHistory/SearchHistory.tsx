import React from 'react';
import { usePhonebookStore } from '../../store/phonebookStore';
import { categoryLabels } from '../../types';
import type { SearchHistoryEntry } from '../../types';

export function SearchHistory() {
  const searchHistory = usePhonebookStore(function (state) {
    return state.searchHistory;
  });
const historyItems = searchHistory.map(function (entry, index){
   const date = new Date(entry.createdAt);
    const formattedDate = date.toLocaleDateString('ru-RU');
    return (
  <li key={index}>
    <button
      type="button"
      onClick={function () {
        handleRepeatSearch(entry);
      }}
    >
      {entry.value} — {categoryLabels[entry.category]} — {formattedDate}
    </button>
  </li>
);
}

);
const setSearchFieldText = usePhonebookStore(function (state) {
  return state.setSearchFieldText;
});

const setCategory = usePhonebookStore(function (state) {
  return state.setCategory;
});

const fetchEmployeesWithParams = usePhonebookStore(function (state) {
  return state.fetchEmployeesWithParams;
});

if (searchHistory.length === 0) {
  return (
    <section>
      <h2>История поиска</h2>
      <p>История пока пуста.</p>
    </section>
  );
}
function handleRepeatSearch(entry: SearchHistoryEntry) {
  setSearchFieldText(entry.value);
  setCategory(entry.category);
  fetchEmployeesWithParams(entry.value, entry.category);
}

return (
  <section>
    <h2>История поиска</h2>
    <ol>{historyItems}</ol>
  </section>
);
}