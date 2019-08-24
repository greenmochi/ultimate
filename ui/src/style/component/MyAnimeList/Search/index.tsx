import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "form"
    "results";
  grid-template-rows: 150px auto;
  overflow-y: auto;
`;

export const Form = styled.form`
  grid-area: form;
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

export const ResultsContainer = styled.div`
  grid-area: results;
`;

export const Result = styled.div`
  height: 50px;
`;