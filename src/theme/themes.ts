// Подмножество светлой темы рабочего проекта. Имена и значения сохранены,
// включая исходное написание backgroundSearh.
export const lightTheme = {
  background: '#f7f7f7',
  backgroundBlock: '#ffffff',
  mainTextColor: '#000000',
  backgroundSearh: '#ffffff',
  backgroundSubHeader: '#f1f1f1',
  backgroundRowHover: '#f8f8ffd0',
  shadowColor: 'rgba(34, 60, 80, 0.75)',
  backgroundSearchItem: '#c5def078',
};

type AppTheme = typeof lightTheme;
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
