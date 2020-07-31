import { useCallback, useEffect } from "react";

import styled from "styled-components";

export const Modal = ({ show, toggleHandler, children }) => {
  const escFunction = useCallback((e) => {
    if (e.keyCode === 27) {
      toggleHandler(false);
    }
  }, []);

  useEffect(() => {
    document && document.addEventListener("keydown", escFunction, false);
    return () => {
      document && document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <>
      <StyledModal show={show}>
        <div
          onTransitionEnd={(e) => (e.target.parentNode.visibility = "hidden")}
        >
          <div className="close">
            <span onClick={() => toggleHandler(false)}>&times;</span>
          </div>
          {children}
        </div>
      </StyledModal>
    </>
  );
};

const StyledModal = styled.div`
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0.5rem;
  transition: opacity 300ms ease-in-out;
  background-color: #00000080;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? 1 : 0)};

  & > * {
    max-width: 650px;
    padding: 2rem;
    margin: 3rem auto;
    border-radius: 0.5rem;
    background-color: var(--foreground-color);
    color: black;
    text-align: initial;
    position: relative;
    transition: transform 300ms ease-in-out;
    transform: translateY(${(props) => (props.show ? 0 : "-15rem")});
  }

  & .close {
    font-family: "Arial", sans-serif;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    text-align: right;
    font-size: 1.5rem;

    & span {
      cursor: pointer;
      opacity: 0.2;
      padding: 0 0.5rem;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
