import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme } from './theme/themes';
import { SearchBar } from './components/SearchBar/SearchBar';
import { EmployeeList } from './components/EmployeesTable/EmployeeList';
import { SearchHistory } from './components/SearchHistory/SearchHistory';

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, sans-serif; background: ${(props) => props.theme.background}; color: ${(props) => props.theme.mainTextColor}; }
  button, input, select { font: inherit; }
  :focus-visible { outline: 2px solid #007bff; outline-offset: -3px; }
  header { background: #076eb5; color: white; padding: 24px; }
  .header-inner, main { max-width: 1040px; margin: auto; }
  .header-inner { display: flex; justify-content: space-between; gap: 16px; align-items: center; }
  header span { font-size: 13px; opacity: .85; }
  main { padding: 32px 20px; }
  h1 { font-size: 25px; margin: 0 0 12px; }
  h2 { font-size: 19px; margin: 0 0 12px; }
  .intro, .hint { color: #666; font-size: 14px; line-height: 1.5; }
  .intro { margin-bottom: 24px; }
  .hint { margin: 10px 0; overflow-wrap: anywhere; }
  .error { color: #ae2424; font-size: 14px; }
  .error:empty { display: none; }
  .suggestion-label { margin: 4px 12px 12px; font-size: 12px; color: #666; }
  .empty-state { background: #f7f7f7; color: #666; padding: 32px 16px; text-align: center; font-size: 14px; line-height: 1.5; }
  footer { text-align: center; color: #666; padding: 16px 20px 30px; font-size: 12px; }
`;

export default function App() {
  return <ThemeProvider theme={lightTheme}>
    <GlobalStyle />
    <header><div className="header-inner"><strong>Справочник сотрудников</strong><span>Учебная версия</span></div></header>
    <main>
      <h1>Поиск сотрудников</h1>
      <p className="intro">Выберите ФИО, должность или подразделение. Все данные в этом справочнике вымышленные.</p>
      <SearchBar />
      <SearchHistory />
      <EmployeeList />
    </main>
    <footer>Локальный справочник · 18 демонстрационных сотрудников</footer>
  </ThemeProvider>;
}
