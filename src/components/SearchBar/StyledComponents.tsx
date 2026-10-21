import { styled } from 'styled-components';

// Адаптация одноимённого файла рабочего проекта: те же цвета и компоненты,
// без фильтра организаций, анимаций и привязки к широкому рабочему layout.
export const SearchComponent = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  background: #0d67a1;
  border: 2px solid #0d67a1;
  border-radius: 10px;
  overflow: hidden;
  &:focus-within { border-color: #007bff; }
  @media (max-width: 620px) { flex-direction: column; }
`;
export const SearchInputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  min-width: 0;
`;
export const SearchInput = styled.input`
  width: 100%; height: 100%; padding: 15px 40px 15px 15px;
  border: none; box-sizing: border-box;
  background: ${(props) => props.theme.backgroundSearh};
  color: ${(props) => props.theme.mainTextColor};
`;
export const ClearButton = styled.button`
  position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
  background: none; border: none; font-size: 22px; color: #666; cursor: pointer;
  width: 30px; height: 32px;
`;
export const CustomSelect = styled.select`
  border: none; border-left: 1px solid #ccc; padding: 15px; cursor: pointer;
  background: ${(props) => props.theme.backgroundSearh};
  color: ${(props) => props.theme.mainTextColor};
  @media (max-width: 620px) { border-left: none; border-top: 1px solid #ccc; }
`;
export const SearchButton = styled.button`
  border: 1px solid #076eb5; padding: 16px 24px;
  background-color: #076eb5; color: white; cursor: pointer;
  &:hover { background-color: #0056b3; }
`;
export const CustomDatalist = styled.section`
  margin-top: 5px; padding: 10px;
  background: ${(props) => props.theme.backgroundBlock};
  border-radius: 10px;
  box-shadow: 0 8px 20px -15px ${(props) => props.theme.shadowColor};
  ul { list-style: none; padding: 0; margin: 0; }
`;
export const CustomDatalistItem = styled.li`
  display: flex; flex-direction: column; justify-content: center;
  min-height: 48px; margin-bottom: 2px; padding: 8px 12px;
  background: ${(props) => props.theme.backgroundSearchItem};
  color: ${(props) => props.theme.mainTextColor};
`;
export const CustomDatalistItemHeader = styled.span`font-size: 15px;`;
export const CustomDatalistItemText = styled.span`font-size: 12px; color: #595959; margin-top: 4px;`;
export const MoreButton = styled.button`
width: 100%; padding: 12px; border: none; border-radius: 6px;
background: transparent; font-weight: 700; cursor: pointer;
color: ${(props) => props.theme.mainTextColor};
&:hover:not(:disabled) { background: ${(props) => props.theme.backgroundRowHover};}
&:disabled { opacity: 0.5; cursor: not-allowed;}
`;
