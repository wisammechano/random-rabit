import styled, { css } from "styled-components";

const colors = {
  default: "#cdd66b",
  yellow: "#cdd66b",
  green: "#83c9a1",
  red: "#d66b6b",
  blue: "#73B9C9",
};

export const Button = styled.button.attrs((props) => ({
  color:
    colors[Object.keys(props).filter((k) => colors[k])[0]] || colors.default,
}))`
  outline: none;
  border: none;
  font-size: ${(props) => (props.small ? "0.5rem" : "1rem")};
  font-family: inherit;
  font-weight: 800;
  color: inherit;
  height: 100%;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 0.25em;

  text-align: center;
  margin: 0.7em;
  background-color: ${(props) => props.color};

  &:hover {
    filter: brightness(105%);
  }

  ${(props) =>
    !props.flat &&
    css`
      position: relative;
      transition: top 0.01s linear;
      text-shadow: 0 0.05em 0 rgba(0, 0, 0, 0.15);

      box-shadow: 0 0 0 0.05em ${props.color} inset, 0 0 0 0.1em #ffffff25 inset,
        0 0.33em 0 0 ${props.color}b3, 0 0.33em 0 0.05em #00000064,
        0 0.33em 0.33em 0.05em #00000080;

      &:active {
        top: 0.375em;
        box-shadow: 0 0 0 1px ${props.color} inset, 0 0 0 0.1em #ffffff25 inset,
          0 0 0 0.05em #00000064;
      }
    `}
`;
