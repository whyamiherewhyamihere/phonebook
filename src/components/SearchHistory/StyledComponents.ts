import { styled } from 'styled-components';

export const HistorySection = styled.section`
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #d9e2ec;
  border-radius: 10px;
  background: ${(props) => props.theme.backgroundBlock};
  color: ${(props) => props.theme.mainTextColor};

  h2 {
    margin: 0 0 12px;
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 16px 0 0;
    padding: 0;
    list-style: none;
  }
`;

export const HistoryButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d9e2ec;
  border-radius: 8px;
  background: ${(props) => props.theme.backgroundSearchItem};
  color: ${(props) => props.theme.mainTextColor};
  text-align: left;
  line-height: 1.5;
  overflow-wrap: anywhere;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.backgroundRowHover};
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;

export const ClearHistoryButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #076eb5;
  border-radius: 6px;
  background: transparent;
  color: #076eb5;
  cursor: pointer;

  &:hover {
    background: #eaf4fc;
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;