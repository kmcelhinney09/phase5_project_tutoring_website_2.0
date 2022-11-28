import React from "react";
import { useAuth } from "../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import SessionRender from "./SessionRender";
import NotesRender from "./NotesRender";
import SessionsTutored from "./SessionsTutored";

function UserInfo() {
  const user = useAuth().currentUser;
  console.log(user)
  return (
    <Container>
      <Row>
        <h1>{user.school.name}</h1>
      </Row>
      <Row>
        <h6>
          {user.full_name} - {user.grade}
        </h6>
      </Row>
      <Row>
        <SessionRender />
      </Row>
      {user.role === "tutor"? <SessionsTutored/>:null}
      <Row>
        <NotesRender />
      </Row>
    </Container>
  );
}

export default UserInfo;
