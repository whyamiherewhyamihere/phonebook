// Подмножество полей Employee из рабочего справочника.
export interface Employee {
  id: string;
  fullNameRus: string;
  positionTitle: string;
  departmentName: string;
  organizationId: string;
  organizationName: string;
}

// Названия категорий сохранены; телефон и email исключены из учебной версии.
export type CATEGORIES = 'fullName' | 'position' | 'department';

export interface SearchParams {
  value: string;
  category: CATEGORIES;
}

export const categoryLabels: Record<CATEGORIES, string> = {
  fullName: 'ФИО',
  position: 'Должность',
  department: 'Подразделение',
};
