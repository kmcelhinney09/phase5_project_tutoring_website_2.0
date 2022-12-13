import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SessionRender from "./SessionRender";
import SessionsTutored from "./SessionsTutored";
import RenderNotes from "./RenderNotes";
import Col from "react-bootstrap/esm/Col";

function UserInfo() {
  const auth = useAuth();
  const user = auth.currentUser;

  const [errors, setErrors] = useState([]);

  function renderErrors() {
    const error_text = errors.map((error, index) => {
      return (
        <li key={index}>
          {error[0]}
          <ul>
            {error[1].map((text) => (
              <li>{text}</li>
            ))}
          </ul>
        </li>
      );
    });
    return error_text;
  }

  function handleDeleteWrittenNotes(noteId, noteIndex) {
    let new_user = JSON.parse(JSON.stringify(user));
    let new_written_notes = new_user.written_notes;
    new_written_notes.splice(noteIndex, 1);
    auth.updateCurrentUser(new_user);

    fetch(`/tutor_note/${noteId}`, {
      method: "DELETE",
    });
  }

  function handleSubjectSelect(subject) {
    let newUser = JSON.parse(JSON.stringify(user));
    let updated_subjects_tutored = newUser.subjects_signed_up;
    updated_subjects_tutored.push(subject);
    auth.updateCurrentUser(newUser);

    fetch(`/tutored_subject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject_id: subject.id, tutor_id: user.id }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((subjectSignedUp) => {});
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));
      }
    });
  }

  function handleSubjectRemoved(sub, subIndex) {
    let newUser = JSON.parse(JSON.stringify(user));
    let updated_subjects_tutored = newUser.subjects_signed_up;
    updated_subjects_tutored.splice(subIndex, 1);
    auth.updateCurrentUser(newUser);

    fetch(`/tutored_subject/${sub.id}`, {
      method: "DELETE",
    });
  }

  return (
    <Container>
      <Row>
        <h1>{user.school.name}</h1>
      </Row>
      <Row className="mb-2">
        <Col md={2}>
          <h5>
            {user.full_name} - {user.grade}
          </h5>
        </Col>
        {user.role === "tutor" ? (
          <>
            <Col md={3}>
              <DropdownButton
                variant="success"
                title="Add a Subject You Tutor"
                drop={"end"}
              >
                {user.school.subjects
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((sub) => {
                    return (
                      <Dropdown.Item
                        key={sub.id}
                        as="button"
                        onClick={() => handleSubjectSelect(sub)}
                      >
                        {sub.name}
                      </Dropdown.Item>
                    );
                  })}
              </DropdownButton>
            </Col>
            <Col md={3}>
              <DropdownButton
                variant="success"
                title="Drop a Subject You Tutor"
                drop={"end"}
              >
                {user.subjects_signed_up
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((sub, index) => {
                    return (
                      <Dropdown.Item
                        key={sub.id}
                        as="button"
                        onClick={() => handleSubjectRemoved(sub, index)}
                      >
                        {sub.name}
                      </Dropdown.Item>
                    );
                  })}
              </DropdownButton>
            </Col>
            <Row>
              <h5>Subjects Tutored</h5>
              <p className="ms-4">
                {user.subjects_signed_up
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((sub, index) => {
                    const size = user.subjects_signed_up.length;
                    if (index <= size - 2) {
                      return <>{`${sub.name}, `}</>;
                    } else {
                      return <>{`${sub.name}`}</>;
                    }
                  })}
              </p>
              <p>{renderErrors()}</p>
            </Row>
          </>
        ) : null}
      </Row>
      <Row>
        <SessionRender />
      </Row>
      {user.role === "tutor" || user.role === "admin" ? (
        <SessionsTutored />
      ) : null}
      <Row>
        <h4>Notes from Tutors:</h4>
        <RenderNotes notesData={user.tutor_notes} userRole={user.role} />
      </Row>
      {user.role === "tutor" || user.role === "admin" ? (
        <Row>
          <h4>Written Notes:</h4>
          <RenderNotes
            notesData={user.written_notes}
            userRole={user.role}
            handleDelete={handleDeleteWrittenNotes}
          />
        </Row>
      ) : null}
    </Container>
  );
}

export default UserInfo;
