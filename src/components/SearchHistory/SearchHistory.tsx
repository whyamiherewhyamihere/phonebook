import React from 'react';
import { usePhonebookStore } from '../../store/phonebookStore';
import { categoryLabels } from '../../types';

export function SearchHistory() {
  const searchHistory = usePhonebookStore(function (state) {
    return state.searchHistory;
  });
const historyItems = searchHistory.map(function (entry, index){
    return(
        <li key={index}>
            {entry.value} — {categoryLabels[entry.category]}
        </li>
    );
}
);

if (searchHistory.length === 0) {
  return (
    <section>
      <h2>История поиска</h2>
      <p>История пока пуста.</p>
    </section>
  );
}

return (
  <section>
    <h2>История поиска</h2>
    <ol>{historyItems}</ol>
  </section>
);
}