// import { useAuth } from "../../context/AuthProvider";
import { useSelector } from "react-redux";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import LeaveNote from "./LeaveNote";

function SessionsTutored() {
  // const auth = useAuth();
  // const user = auth.currentUser;
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [tuteeData, setTuteeData] = useState(0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  function handleDropBookedSession(session_id, session_index) {
    let newUser = JSON.parse(JSON.stringify(user));
    let newBookedSlots = newUser.bookedAsTutor;
    newBookedSlots.splice(session_index, 1);
    // auth.updateCurrentUser(newUser);

    fetch(`/booked_slot/${session_id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        // auth.auto();
      }
    });
  }

  function handleDropEntireSession(session_id, session_index) {
    let newUser = JSON.parse(JSON.stringify(user));
    let newSignUps = newUser.tutorSignUps;
    newSignUps.splice(session_index, 1);
    // auth.updateCurrentUser(newUser);

    fetch(`/tutor_slot_sign_up/${session_id}`, {
      method: "DELETE",
    });
  }

  function handleAddNote(tuteeId, tuteeName) {
    setTuteeData({ tuteeId: tuteeId, tuteeName: tuteeName });
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
                {user.tutorSignUps.length !== 0 ? (
                  user.tutorSignUps.map((signUp, index) => {
                    return (
                      <tr key={signUp.id + 10}>
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
                {user.bookedAsTutor.length !== 0 ? (
                  user.bookedAsTutor.map((slot, index) => {
                    return (
                      <tr key={slot.id.toString() + slot.tutee.full_name}>
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
                            onClick={() =>
                              handleAddNote(slot.tutee.id, slot.tutee.full_name)
                            }
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
          <LeaveNote closeForm={handleCloseModal} tuteeData={tuteeData} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SessionsTutored;
