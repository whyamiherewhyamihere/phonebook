import React from 'react';
import { styled } from 'styled-components';
import { categoryLabels } from '../../types';
import { usePhonebookStore } from '../../store/phonebookStore';

// Цвета и вид строк адаптированы из EmployeesTable/StyledComponents.tsx.
const EmployeeListWrapperMain = styled.section`
  margin-top: 24px; padding: 20px; border-radius: 10px;
  background: ${(props) => props.theme.backgroundBlock};
  color: ${(props) => props.theme.mainTextColor};
`;
const Table = styled.table`
  width: 100%; border-collapse: collapse; text-align: left;
  th { background: #076eb5; color: white; font-weight: 400; }
  th, td { padding: 14px 12px; }
  td { border-bottom: 1px solid ${(props) => props.theme.backgroundSubHeader}; }
  tbody tr:hover { background: ${(props) => props.theme.backgroundRowHover}; }
  small { display: block; color: #666; margin-top: 6px; }
  @media (max-width: 620px) { th, td { padding: 10px 6px; font-size: 12px; } }
`;

export function EmployeeList() {
  const employeesList = usePhonebookStore((state) => state.employeesList);
  const submittedSearch = usePhonebookStore((state) => state.submittedSearch);
  return <EmployeeListWrapperMain aria-labelledby="results-heading">
    <h2 id="results-heading">Результаты поиска</h2>
    <p className="hint" role="status">{submittedSearch
      ? `${categoryLabels[submittedSearch.category]}: «${submittedSearch.value}». Найдено: ${employeesList.length}`
      : 'Введите запрос и выберите категорию поиска.'}</p>
    {employeesList.length > 0 ? <Table>
      <thead><tr><th scope="col">ФИО</th><th scope="col">Должность</th><th scope="col">Подразделение</th></tr></thead>
      <tbody>{employeesList.map((employee) => <tr key={`${employee.organizationId}:${employee.id}`}>
        <td>{employee.fullNameRus}<small>{employee.organizationName}</small></td>
        <td>{employee.positionTitle}</td><td>{employee.departmentName}</td>
      </tr>)}</tbody>
    </Table> : <div className="empty-state">{submittedSearch
      ? 'Ничего не найдено. Проверьте введённые данные или выбранную категорию.'
      : 'Здесь появятся сотрудники, соответствующие запросу.'}</div>}
  </EmployeeListWrapperMain>;
}
