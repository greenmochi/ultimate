import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "tab-menu"
    "view";
  grid-template-rows: 50px auto;
  background-color: white;
  text-align: center;
  overflow-y: hidden;
`;

export const TabMenu = styled.div`
  display: grid;
  grid-area: tab-menu;
  grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
`;

export const Form = styled.form`
  margin: 10px;
`;

export const Input = styled.input`
  font-size: 1.3em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  outline: none;
`;

export const SubmitButton = styled.button`
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
