import { create } from 'zustand';
import type { CATEGORIES, Employee, SearchParams, SearchHistoryEntry } from '../types';
import { employees } from '../data/employees';
import { searchEmployees, normalizeQuery,} from '../utils/searchEmployees';



interface PhonebookState {
  searchFieldText: string;
  category: CATEGORIES;
  EmployeesListLimit: Employee[];
  employeesList: Employee[];
  submittedSearch: SearchParams | null;
  searchHistory: SearchHistoryEntry[];
  clearSearchHistory: () => void;
  setSearchFieldText: (value: string) => void;
  setCategory: (category: CATEGORIES) => void;
  clearEmployeesListLimit: () => void;
  fetchEmployeeForSearchBar: (value: string, category: CATEGORIES) => void;
  fetchEmployeesWithParams: (value: string, category: CATEGORIES) => boolean;
}

// Данные локальные, сетевых запросов нет.
export const usePhonebookStore = create<PhonebookState>((set) => ({
  searchFieldText: '',
  category: 'fullName',
  EmployeesListLimit: [],
  employeesList: [],
  submittedSearch: null,
  searchHistory: [],

  setSearchFieldText: (value) => set({ searchFieldText: value }),

  setCategory: (category) => set({ category }),

  clearEmployeesListLimit: () => set({ EmployeesListLimit: [] }),

  fetchEmployeeForSearchBar: (value, category) => {
    set({
      EmployeesListLimit: value.trim().length < 2
        ? []
        : searchEmployees(employees, value, category).slice(0, 10),
    });
  },

  fetchEmployeesWithParams: function (value, category) {
    const trimmed = value.trim().replace(/\s+/g, ' ');

    if (trimmed.length < 3) {
      return false;
    }

    const foundEmployees = searchEmployees(
      employees,
      trimmed,
      category
    );

    const newSearch = {
      value: trimmed,
      category: category,
      createdAt: new Date().toISOString(),
    };

    set(function (state) {
      const historyWithoutDuplicate = state.searchHistory.filter(function (entry) {
        const oldText = normalizeQuery(entry.value);
        const newText = normalizeQuery(newSearch.value);

        const textIsDifferent = oldText !== newText;
        const categoryIsDifferent = entry.category !== newSearch.category;

      return textIsDifferent || categoryIsDifferent;
    }
  );

const updatedHistory = [newSearch, ...historyWithoutDuplicate];
const limitedHistory = updatedHistory.slice(0, 5);
      
      return {
        employeesList: foundEmployees,
        submittedSearch: newSearch,
        searchHistory: limitedHistory,
      };
    });

    return true;
  },
  clearSearchHistory: function () {
    set({
      searchHistory: [],
    });
  },
  
}));