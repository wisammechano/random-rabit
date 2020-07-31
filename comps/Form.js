import styled from "styled-components";

export const Form = styled.form`
  label {
    display: block;
    font-weight: 800;
  }

  [contenteditable],
  input:not([type="submit"]):not([type="reset"]) {
    display: block;
    width: 100%;
    padding: 0.4rem;
    border: 1px solid #f0efe6;
    background: #00000000;
    font-family: inherit;
    font-size: 0.7rem;

    &[placeholder]:empty:before {
      content: attr(placeholder);
      color: gray;
    }

    &:active,
    &:focus {
      outline: none;
      background: #00000010;
    }

    &:hover {
      border: 1px solid gray;
    }
  }

  [contenteditable] {
    min-height: 100px;
    max-height: 300px;
    overflow: auto;
  }
`;
