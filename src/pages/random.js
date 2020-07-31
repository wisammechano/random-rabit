import { useParams } from "react-router-dom";
import { getLocalStorage } from "../utils/storage";
import { Error } from "../comps";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const getGroup = (id) => {
  const data = getLocalStorage();
  console.log(data);
  if (data) {
    return data.groups.filter((g) => g.id === id).shift();
  }
  return null;
};

const Random = () => {
  const route = useParams();
  const groupId = parseInt(route.slug.split("-").pop());
  const [group, setGroup] = useState(false);

  useEffect(() => {
    setGroup(getGroup(groupId));
  }, [groupId]);

  return (
    <>
      {!Boolean(group) && <Error code="404" />}
      {group && <Randomizer group={group} />}
    </>
  );
};

export default Random;

const Wrapper = styled.div`
  display: flex;
`;

const Randomizer = ({ group }) => {
  const [include, setInclude] = useState(group.members);

  const onClick = (e) => {
    const name = e.currentTarget.dataset.id.replace(/[_]/gi, " ");
    const index = include.indexOf(name);
    if (index >= 0) setInclude(include.filter((m) => m !== name));
    else {
      setInclude([...include, name]);
    }
  };

  return (
    <Wrapper>
      <StudentsList
        title={group.name}
        include={include}
        exclude={group.members.filter((m) => !include.includes(m))}
        onClickHandler={onClick}
      />
      <div></div>
    </Wrapper>
  );
};

const StyledStudentList = styled.aside`
  flex-basis: 25%;
  flex-shrink: 0;
  flex-grow: 0;
`;

const StudentsList = ({ include, exclude, title, onClickHandler }) => (
  <StyledStudentList>
    <h3>{title}</h3>
    <FlexedList>
      {include.map((name, idx) => (
        <StudentItem
          id={name.replace(/[ ]/gi, "_")}
          key={name}
          included={true}
          number={idx + 1}
          onClickHandler={onClickHandler}
        >
          {name}
        </StudentItem>
      ))}
      <li>
        <hr></hr>
      </li>
      {exclude.map((name, idx) => (
        <StudentItem
          id={name.replace(/[ ]/gi, "_")}
          key={name}
          included={false}
          number={idx + 1}
          onClickHandler={onClickHandler}
        >
          {name}
        </StudentItem>
      ))}
    </FlexedList>
  </StyledStudentList>
);

const StudentItem = ({ number, id, children, included, onClickHandler }) => (
  <StyledStudentItem>
    <span
      style={{
        textDecoration: !included ? "line-through dashed black" : "none",
      }}
    >
      {number}. {children}
    </span>
    <ListButton data-id={id} onClick={onClickHandler}>
      <span aria-label={included ? "remove" : "add"} role="img">
        {included ? "❌" : "➕"}
      </span>
    </ListButton>
  </StyledStudentItem>
);

const FlexedList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 80vh;
`;

const StyledStudentItem = styled.li`
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.2rem;
  padding-right: 0.4rem;
`;

const ListButton = styled.button`
  background: none;
  padding: 2px;
  border: none;
  cursor: pointer;
`;
