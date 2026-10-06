import test from 'node:test';
import assert from 'node:assert/strict';
import { employees } from './data/employees';
import { searchEmployees } from './utils/searchEmployees';
import { usePhonebookStore } from './store/phonebookStore';

test('Категория ограничивает поле поиска', () => {
  assert.equal(searchEmployees(employees, 'Анна', 'fullName').length, 2);
  assert.equal(searchEmployees(employees, 'Анна', 'position').length, 0);
  assert.equal(searchEmployees(employees, 'ИТ-поддержка', 'department').length, 3);
  assert.equal(searchEmployees(employees, 'инженер', 'position').length, 2);
});
test('Пробелы, регистр и ё не мешают поиску', () => {
  assert.equal(searchEmployees(employees, '  АРТЕМ   козлов ', 'fullName')[0].id, '6');
  assert.equal(searchEmployees(employees, ' ', 'fullName').length, 0);
});
test('Подсказки не заменяют подтверждённую выдачу; короткий поиск отклоняется', () => {
  const store = usePhonebookStore.getState();
  assert.equal(store.fetchEmployeesWithParams('Анна', 'fullName'), true);
  store.fetchEmployeeForSearchBar('инженер', 'position');
  assert.equal(usePhonebookStore.getState().EmployeesListLimit.length, 2);
  assert.equal(usePhonebookStore.getState().submittedSearch?.value, 'Анна');
  assert.equal(usePhonebookStore.getState().employeesList[0].fullNameRus, 'Анна Сергеевна Лебедева');
  assert.equal(store.fetchEmployeesWithParams('аб', 'fullName'), false);
  assert.equal(usePhonebookStore.getState().submittedSearch?.value, 'Анна');
  store.fetchEmployeesWithParams('несуществующий', 'department');
  assert.equal(usePhonebookStore.getState().employeesList.length, 0);
  assert.equal(usePhonebookStore.getState().submittedSearch?.category, 'department');
});
