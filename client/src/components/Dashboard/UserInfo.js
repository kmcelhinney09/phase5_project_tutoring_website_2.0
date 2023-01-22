import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import SessionRender from "./SessionRender";
import SessionsTutored from "./SessionsTutored";
import RenderNotes from "./RenderNotes";
import ActionMessage from "../ActionMessage";
import {
  removeWrittenNote,
  removeSubjectsTutored,
  addSubjectsTutored,
  setServerError,
  clearError,
} from "../ManageUsers/userSlice";

function UserInfo() {
  const { user, school } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearError);
  };
  const handleShowModal = () => setShowModal(true);

  function handleModalAction(modal_type) {
    if (modal_type === "renderError") {
      setModalTitle("Error");
      setModalBody(
        <ActionMessage
          closeForm={handleCloseModal}
          actionMessage={user.errorText}
          bgcolor="danger"
        />
      );
    }
    handleShowModal();
  }

  function handleDeleteWrittenNotes(noteId) {
    //[x]: Link action to remove writtenNotes from user store
    dispatch(removeWrittenNote(noteId));

    fetch(`/tutor_note/${noteId}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        dispatch(setServerError({ error: [res.status, res.statusText] }));
        handleModalAction("renderError");
      }
    });
  }

  function handleSubjectSelect(subject) {
    //[x]: Link action to add subject to user subjects tutored
    dispatch(addSubjectsTutored(subject));

    fetch(`/tutored_subject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject_id: subject.id, tutor_id: user.id }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((subjectSignedUp) => subjectSignedUp);
      } else {
        dispatch(setServerError({ error: [res.status, res.statusText] }));
        handleModalAction("renderError");
      }
    });
  }

  function handleSubjectRemoved(sub) {
    //[x]: link action to remove subjects tutored from user
    dispatch(removeSubjectsTutored(sub.id));
    fetch(`/tutored_subject/${sub.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        dispatch(setServerError({ error: [res.status, res.statusText] }));
        handleModalAction("renderError");
      }
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
              <ul className="ms-4">
                {user.subjectsSignedUp.map((sub, index) => {
                  const size = user.subjectsSignedUp.length;
                  if (index <= size - 2) {
                    return <li key={index}>{`${sub.name}, `}</li>;
                  } else {
                    return <li key={index}>{`${sub.name}`}</li>;
                  }
                })}
              </ul>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </Container>
  );
}

export default UserInfo;
