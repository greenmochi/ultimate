import styled from "styled-components";

export const SNyaaContainer = styled.div`
  background-color: #282C3C;
  text-align: center;
  padding: 5px; 
`;

export const SForm = styled.form`
  margin: 10px;
`;

export const SInput = styled.input`
  font-size: 1.3em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  outline: none;
`;

export const SSubmitButton = styled.button`
  font-size: 1.3em;
  margin-left: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  background-color: #F7941D;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const STable = styled.table`
  margin: auto;
  border-spacing: 0;
`;

export const STableRow = styled.tr`
  text-align: center;
`;

interface STableHeaderProps {
  readonly width?: string;
  readonly minWidth?: string;
}

export const STableHeader = styled.th<STableHeaderProps>`
  color: #03DAC5;
  border: 1px solid grey;
  width: ${props => props.width};
  min-width: ${props => props.minWidth};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

interface STableDataProps {
  readonly color?: string;
  readonly left?: boolean;
}

export const STableData = styled.td<STableDataProps>`
  color: ${props => props.color ? props.color : "#A1A9B5"};
  border: 1px solid grey;
  padding: 5px;
  text-align: ${props => props.left ? "left" : "center"};
`;