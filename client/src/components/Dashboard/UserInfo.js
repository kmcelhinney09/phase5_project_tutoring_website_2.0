import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SessionRender from "./SessionRender";
import SessionsTutored from "./SessionsTutored";
import RenderNotes from "./RenderNotes";
import Col from "react-bootstrap/esm/Col";
import {
  removeWrittenNote,
  removeSubjectsTutored,
  addSubjectsTutored
} from "../ManageUsers/userSlice";


function UserInfo() {
  const { user, school } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]); //[]: link error handeling

  //[]: connect errors to the proper store user
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

  function handleDeleteWrittenNotes(noteId) {
    //[x]: Link action to remove writtenNotes from user store
    dispatch(removeWrittenNote(noteId));

    fetch(`/tutor_note/${noteId}`, {
      //[]: create message that action was successful
      method: "DELETE",
    });
  }

  function handleSubjectSelect(subject) {
    //[x]: Link action to add subject to user subjects tutored
    dispatch(addSubjectsTutored(subject))

    fetch(`/tutored_subject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject_id: subject.id, tutor_id: user.id }),
    }).then((res) => {
      if (res.ok) {
        //[]: create message that action was successful
        res.json().then((subjectSignedUp) => {});
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error))); //[]: link to errors in user store
      }
    });
  }

  function handleSubjectRemoved(sub) {
    //[x]: link action to remove subjects tutored from user
    dispatch(removeSubjectsTutored(sub.id));
    
    //[]: create message that action was successful
    fetch(`/tutored_subject/${sub.id}`, {
      method: "DELETE",
    });
  }

  return (
    <Container>
      <Row>
        <h1>{school.name}</h1>
      </Row>
      <Row className="mb-2">
        <Col md={2}>
          <h5>
            {user.fullName} - {user.grade}
          </h5>
        </Col>
        {user.role === "tutor" ? (
          <>
            <Col md={3}>
              <DropdownButton
                variant="success"
                title="Add Tutor Subject"
                drop={"end"}
              >
                {school.subjects.map((sub) => {
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
                title="Drop Tutor Subject"
                drop={"end"}
              >
                {user.subjectsSignedUp.map((sub, index) => {
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
                {user.subjectsSignedUp.map((sub, index) => {
                  const size = user.subjectsSignedUp.length;
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
        <RenderNotes notesData={user.tutorNotes} userRole={user.role} />
      </Row>
      {user.role === "tutor" || user.role === "admin" ? (
        <Row>
          <h4>Written Notes:</h4>
          <RenderNotes
            notesData={user.notesWritten}
            userRole={user.role}
            handleDelete={handleDeleteWrittenNotes}
          />
        </Row>
      ) : null}
    </Container>
  );
}

export default UserInfo;
