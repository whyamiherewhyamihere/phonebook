import { create } from 'zustand';
import type { CATEGORIES, Employee, SearchParams } from '../types';
import { employees } from '../data/employees';
import { searchEmployees } from '../utils/searchEmployees';

interface PhonebookState {
  searchFieldText: string;
  category: CATEGORIES;
  EmployeesListLimit: Employee[];
  employeesList: Employee[];
  submittedSearch: SearchParams | null;
  setSearchFieldText: (value: string) => void;
  setCategory: (category: CATEGORIES) => void;
  clearEmployeesListLimit: () => void;
  fetchEmployeeForSearchBar: (value: string, category: CATEGORIES) => void;
  fetchEmployeesWithParams: (value: string, category: CATEGORIES) => boolean;
}

// Имена основных полей и действий сохранены из рабочего стора.
// fetch* здесь синхронные: данные локальные, сетевых запросов нет.
export const usePhonebookStore = create<PhonebookState>((set) => ({
  searchFieldText: '',
  category: 'fullName',
  EmployeesListLimit: [],
  employeesList: [],
  submittedSearch: null,
  setSearchFieldText: (value) => set({ searchFieldText: value }),
  setCategory: (category) => set({ category }),
  clearEmployeesListLimit: () => set({ EmployeesListLimit: [] }),
  fetchEmployeeForSearchBar: (value, category) => {
    set({ EmployeesListLimit: value.trim().length < 2
      ? [] : searchEmployees(employees, value, category).slice(0, 10) });
  },
  fetchEmployeesWithParams: (value, category) => {
    const trimmed = value.trim().replace(/\s+/g, ' ');
    if (trimmed.length < 3) return false;
    set({
      employeesList: searchEmployees(employees, trimmed, category),
      submittedSearch: { value: trimmed, category },
    });
    // Задание: сохранять подтверждённый запрос и категорию в истории.
    // Предварительные подсказки не должны попадать в историю.
    return true;
  },
}));
