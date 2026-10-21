import React, { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { categoryLabels, type CATEGORIES } from '../../types';
import { usePhonebookStore } from '../../store/phonebookStore';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import {
  SearchComponent, SearchInputWrapper, SearchInput, ClearButton, CustomSelect,
  SearchButton, CustomDatalist, CustomDatalistItem, CustomDatalistItemHeader,
  CustomDatalistItemText, MoreButton,
} from './StyledComponents';

// Упрощённый SearchBar: сохранены категория, debounce и подтверждение поиска.
export function SearchBar() {
  const searchFieldText = usePhonebookStore((state) => state.searchFieldText);
  const setSearchFieldText = usePhonebookStore((state) => state.setSearchFieldText);
  const category = usePhonebookStore((state) => state.category);
  const setCategory = usePhonebookStore((state) => state.setCategory);
  const EmployeesListLimit = usePhonebookStore((state) => state.EmployeesListLimit);
  const fetchEmployeeForSearchBar = usePhonebookStore((state) => state.fetchEmployeeForSearchBar);
  const fetchEmployeesWithParams = usePhonebookStore((state) => state.fetchEmployeesWithParams);
  const clearEmployeesListLimit = usePhonebookStore((state) => state.clearEmployeesListLimit);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebouncedValue(searchFieldText, 500);

  useEffect(() => {
    if (debouncedQuery === searchFieldText && debouncedQuery.trim().length >= 2) {
      fetchEmployeeForSearchBar(debouncedQuery, category);
    } else {
      clearEmployeesListLimit();
    }
  }, [debouncedQuery, searchFieldText, category, fetchEmployeeForSearchBar, clearEmployeesListLimit]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSearch(event?: FormEvent) {
  event?.preventDefault();

  const success = fetchEmployeesWithParams(searchFieldText, category);

  if (!success) {
    setError('Введите не менее трёх символов.');
    setIsOpen(true);
    return;
  }

  setError('');
  setIsOpen(false);
}

  const showSuggestions = isOpen && searchFieldText.trim().length >= 2 && debouncedQuery === searchFieldText;

  return (
    <div ref={containerRef} onKeyDown={(event) => {
      if (event.key === 'Escape') setIsOpen(false);
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
    }}>
      <form role="search" onSubmit={handleSearch}>
        <SearchComponent>
          <SearchInputWrapper>
            <SearchInput ref={inputRef} aria-label="Поисковый запрос" aria-describedby="search-hint search-error"
              aria-invalid={Boolean(error)} placeholder="Поиск сотрудника…" value={searchFieldText} autoComplete="off"
              onFocus={() => setIsOpen(true)} onChange={(event) => {
                setSearchFieldText(event.target.value); setIsOpen(true); setError('');
              }} />
            {searchFieldText && <ClearButton type="button" aria-label="Очистить строку" onClick={() => {
              setSearchFieldText(''); setIsOpen(false); setError(''); inputRef.current?.focus();
            }}>×</ClearButton>}
          </SearchInputWrapper>
          <CustomSelect aria-label="Категория поиска" value={category} onChange={(event) => {
            setCategory(event.target.value as CATEGORIES); setIsOpen(true); setError('');
          }}>
            {Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </CustomSelect>
          <SearchButton type="submit">Поиск</SearchButton>
        </SearchComponent>
      </form>
      <p className="hint" id="search-hint">Подсказки — от 2 символов. Поиск по Enter или кнопке — от 3.</p>
      <p className="error" id="search-error" role="alert">{error}</p>
      {showSuggestions && <CustomDatalist aria-label="Подсказки поиска">
        <p className="suggestion-label">Предварительные результаты · {categoryLabels[category]}</p>
        {EmployeesListLimit.length ? <ul>
          {EmployeesListLimit.map((employee) => <CustomDatalistItem key={`${employee.organizationId}:${employee.id}`}>
            <CustomDatalistItemHeader>{employee.fullNameRus}</CustomDatalistItemHeader>
            <CustomDatalistItemText>{employee.positionTitle} · {employee.departmentName}</CustomDatalistItemText>
          </CustomDatalistItem>)}
        </ul> : <p className="hint">Ничего не найдено. Проверьте запрос или категорию.</p>}
        <MoreButton type="button" onClick={() => handleSearch()}>Показать все</MoreButton>
      </CustomDatalist>}
    </div>
  );
}
