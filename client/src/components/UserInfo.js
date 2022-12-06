import React from "react";
import { useAuth } from "../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import SessionRender from "./SessionRender";
import SessionsTutored from "./SessionsTutored";
import RenderNotes from "./Dashboard/RenderNotes";

function UserInfo() {
  const auth = useAuth();
  const user = auth.currentUser;

  function handleDeleteWrittenNotes(noteId, noteIndex) {
    let new_user = JSON.parse(JSON.stringify(user));
    let new_written_notes = new_user.written_notes
    new_written_notes.splice(noteIndex, 1);
    console.log(new_user);
    auth.updateCurrentUser(new_user);

    fetch(`/tutor_note/${noteId}`, {
      method: "DELETE",
    });
  }

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
      {user.role === "tutor" || user.role==="admin"? <SessionsTutored /> : null}
      <Row>
        <h4>Notes from Tutors:</h4>
        <RenderNotes notesData={user.tutor_notes} userRole={user.role} />
      </Row>
      {user.role === "tutor" || user.role==="admin"?(
      <Row>
      <h4>Written Notes:</h4>
        <RenderNotes
          notesData={user.written_notes}
          userRole={user.role}
          handleDelete={handleDeleteWrittenNotes}
        />
      </Row>):null}
    </Container>
  );
}

export default UserInfo;
