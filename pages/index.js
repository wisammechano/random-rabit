import { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Selector } from "../comps";
import Router from "next/router";
import styled from "styled-components";
import { setLocalStorage, getLocalStorage } from "../utils/storage";

const Home = () => {
  return (
    <div>
      <AppTitle>Random Rabbit 🐇</AppTitle>
      <App />
    </div>
  );
};

const AppTitle = styled.h1`
   {
    font-size: 3rem;
    margin-top: 8rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

export default Home;

const App = () => {
  const [groups, setGroups] = useState([]);
  const [showModal, toggleModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editing, setIsEditing] = useState(null);

  useEffect(() => {
    const data = getLocalStorage();
    setGroups(data.groups);
    setSelectedGroup(data.groups[0]);
  }, []);

  const showGroupEditor = () => {
    toggleModal(true);
  };

  const saveGroup = (group) => {
    const data = getLocalStorage() || { groups: [] };

    if (editing) {
      const original = data.groups.filter((g) => g.id === group.id)[0];
      const idx = data.groups.indexOf(original);
      data.groups.splice(idx, 1, group);
      setIsEditing(null);
    } else {
      group.id = data.groups.length;
      data.groups.push(group);
    }
    setLocalStorage(data);
    setGroups(data.groups);
    setSelectedGroup(group);
  };

  const handleEdit = () => {
    setIsEditing(selectedGroup);
    toggleModal(true);
  };

  const handleDelete = () => {
    const data = getLocalStorage();
    const original = data.groups.filter((g) => g.id === selectedGroup.id)[0];
    const idx = data.groups.indexOf(original);
    data.groups.splice(idx, 1);
    setLocalStorage(data);
    setGroups(data.groups);
    setSelectedGroup(data.groups[0]);
  };

  return (
    <Container>
      {groups.length > 0 && (
        <>
          <h3>Select Group</h3>
          <Flex row>
            <Selector
              items={groups}
              onItemSelected={(item) => setSelectedGroup(item)}
              title={(group) => `${group.name} (${group.members.length})`}
              identifier={(group) => group.id}
              selected={selectedGroup}
            />
            <Button small blue onClick={handleEdit}>
              Edit
            </Button>
            <Button small red onClick={handleDelete}>
              Delete
            </Button>
            <Button small onClick={() => showGroupEditor()}>
              Add
            </Button>
          </Flex>
          <div>
            <Button
              green
              onClick={() =>
                Router.push("/app/[id]", `/app/${selectedGroup.id}`)
              }
            >
              Go!
            </Button>
          </div>
        </>
      )}

      {groups.length === 0 && (
        <div>
          <Button onClick={() => showGroupEditor()}>Add Group</Button>
        </div>
      )}

      <GroupEditor
        show={showModal}
        toggleHandler={(show) => {
          toggleModal(show);
          setIsEditing(null);
        }}
        group={editing}
        handleSubmit={saveGroup}
      />
    </Container>
  );
};

const Container = styled.div`
  width: ${(props) => props.width || 600};
  margin: 1rem auto;
  text-align: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.col ? "column" : "row")};
  align-items: center;
  justify-content: center;
`;

const GroupEditor = ({ group, ...props }) => {
  const [form, setForm] = useState({ name: "", members: [] });

  const membersInput = useRef(null);

  useEffect(() => {
    if (group) {
      setForm(group);
      membersInput.current.innerText = group.members.join("\n");
    }
  }, [group]);

  const handlePaste = (e) => {
    e.preventDefault();

    let clip = (e.originalEvent || e).clipboardData.getData("text/plain");

    clip = clip
      .split(/\r\n?|\n/gi)
      .map((line) => line.trim())
      .join("\n");

    clip && document.execCommand("insertText", false, clip);
  };

  const handleNames = (e) => {
    const input = e.target.innerText
      .split(/\r\n?|\n/gi)
      .map((name) => name.trim())
      .filter((name) => name !== "");

    setForm({ ...form, members: [...input] });
  };

  const reset = () => {
    setForm({ ...form, name: "", members: [] });
    membersInput.current.innerText = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.length >= 3) {
      props.handleSubmit(form);
    }
    onDismiss();
  };

  const onDismiss = () => {
    reset();
    props.toggleHandler();
  };

  return (
    <Modal show={props.show} toggleHandler={onDismiss}>
      <Form onReset={reset} onSubmit={handleSubmit}>
        <label htmlFor="group-name">Group Name</label>
        <input
          id="group-name"
          type="text"
          placeholder="Enter Name"
          required={true}
          autoComplete="off"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label htmlFor="group-members">
          Group Members {<span>({form.members.length})</span>}
        </label>
        <div
          onPaste={handlePaste}
          id="group-members"
          placeholder="Enter each name in a separate line"
          contentEditable="true"
          autoCapitalize="false"
          autoCorrect="false"
          spellCheck="false"
          onInput={handleNames}
          onBlur={handleNames}
          ref={membersInput}
        />

        <div style={{ textAlign: "right", margin: "0.5rem" }}>
          <Button red as="input" type="reset" value="Clear" tabIndex={-1} />
          <Button as="input" type="submit" value="Save" />
        </div>
      </Form>
    </Modal>
  );
};
