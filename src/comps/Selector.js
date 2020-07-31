import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

export const Selector = ({
  items,
  onItemSelected,
  title,
  identifier,
  selected,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const innerItems = items || [];
  const getId = (item) => identifier(item) || innerItems.indexOf(item);

  const hideOptions = useCallback(() => {
    if (showDropdown) {
      setShowDropdown(false);
      return true;
    }
    return false;
  }, [showDropdown]);

  useEffect(() => {
    document.addEventListener("click", hideOptions, false);

    return () => document.removeEventListener("click", hideOptions);
  }, [showDropdown, hideOptions]);

  return (
    <Wrapper onClick={() => setShowDropdown(!showDropdown)}>
      <Selected>
        <span>{title(selected)}</span>
      </Selected>
      <OptionsWrapper show={showDropdown}>
        {innerItems.map((item) => (
          <Option
            key={getId(item)}
            id={getId(item)}
            onClick={() => onItemSelected(item)}
          >
            {title(item)}
          </Option>
        ))}
      </OptionsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 0.8rem;
  cursor: pointer;
  position: relative;
  display: inline-block;
  min-width: 300px;
  & * {
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    user-select: none;
  }
`;

const Selected = styled.div`
  background: #00000020;
  border: 1px solid var(--foreground-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: #00000010;
  }

  span {
    padding: 0.2em 0.8em;
  }
  &::after {
    content: "˅";
    width: 2em;
    display: inline-block;
    text-align: center;
  }
`;

const OptionsWrapper = styled.ul`
  overflow: auto;
  position: absolute;
  max-height: 10em;
  z-index: 999;
  width: 100%;
  list-style: none;
  background-color: var(--foreground-color);
  color: black;
  display: ${(props) => (props.show ? "block" : "none ")};
`;

const Option = styled.li`
  width: 100%;

  &:not(:last-child)::after {
    display: block;
    content: "";
    border-bottom: 1px solid gray;
  }

  &:hover {
    background: #00000020;
  }
`;
