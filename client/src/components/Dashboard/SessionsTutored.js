import { useAuth } from "../../context/AuthProvider";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import LeaveNote from "./LeaveNote";

function SessionsTutored() {
  const auth = useAuth();
  const user = auth.currentUser;
  const [showModal, setShowModal] = useState(false);
  const [tuteeId, setTuteeId] = useState(0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  function handleDropBookedSession(session_id, session_index) {
    let new_user = JSON.parse(JSON.stringify(user));
    let new_booked_slots = new_user.booked_as_tutor;
    new_booked_slots.splice(session_index, 1);
    auth.updateCurrentUser(new_user);

    fetch(`/booked_slot/${session_id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        auth.auto();
      }
    });
  }

  function handleDropEntireSession(session_id, session_index) {
    let newUser = JSON.parse(JSON.stringify(user));
    let newSignUps = newUser.tutor_sign_ups;
    newSignUps.splice(session_index, 1);
    auth.updateCurrentUser(newUser);

    fetch(`/tutor_slot_sign_up/${session_id}`, {
      method: "DELETE",
    });
  }

  function handleAddNote(tuteeID) {
    setTuteeId(tuteeID);
    handleShowModal();
  }

  return (
    <>
      <Container>
        <Row>
          <h4>Sessions as Tutor</h4>
          <Row>
            <h5>Slots Signup For</h5>
            <Table responsive="md">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Session</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user.tutor_sign_ups.length !== 0 ? (
                  user.tutor_sign_ups
                    .sort((a, b) => (a.date_sort > b.date_sort ? 1 : -1))
                    .map((signUp, index) => {
                      return (
                        <tr>
                          <td>{signUp.location}</td>
                          <td>{signUp.date}</td>
                          <td>
                            {signUp.start_time}-{signUp.end_time}
                          </td>
                          <td>
                            <Button
                              variant="success"
                              className="mb-2"
                              onClick={() =>
                                handleDropEntireSession(signUp.id, index)
                              }
                            >
                              Drop Session
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td>No Current Sessions</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
          <Row>
            <h5>Individual Sessions</h5>
            <Table responsive="md">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Session</th>
                  <th>Time</th>
                  <th>Tutee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user.booked_as_tutor.length !== 0 ? (
                  user.booked_as_tutor
                    .sort((a, b) => (a.date_sort > b.date_sort ? 1 : -1))
                    .map((slot, index) => {
                      return (
                        <tr key={slot.id}>
                          <td>{slot.location}</td>
                          <td>{slot.date}</td>
                          <td>
                            {slot.start_time}-{slot.end_time}
                          </td>
                          <td>{slot.tutee.full_name}</td>
                          <td>
                            <Button
                              variant="success"
                              className="mb-2"
                              onClick={() =>
                                handleDropBookedSession(slot.id, index)
                              }
                            >
                              Drop Session
                            </Button>{" "}
                            <Button
                              variant="success"
                              className="mb-2"
                              onClick={() => handleAddNote(slot.tutee.id)}
                            >
                              Leave Note
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td>No Current Sessions</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
        </Row>
      </Container>
      <Modal size="lg" show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Leave Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeaveNote closeForm={handleCloseModal} tuteeId={tuteeId} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SessionsTutored;
