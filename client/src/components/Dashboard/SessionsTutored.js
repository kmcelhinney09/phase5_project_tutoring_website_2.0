import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import LeaveNote from "./LeaveNote";
import {
  removeBookedAsTutor,
  removeEntireTutoringSession,
} from "../ManageUsers/userSlice";

function SessionsTutored() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [tuteeData, setTuteeData] = useState(0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  function handleDropBookedSession(session_id) {
    dispatch(removeBookedAsTutor(session_id));

    //[x] link drop to user store
    fetch(`/booked_slot/${session_id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        //[]: create message that action was successful
      }
    });
  }

  function handleDropEntireSession(session_id) {
    // [x]: link drop entire session to user store
    dispatch(removeEntireTutoringSession(session_id));

    fetch(`/tutor_slot_sign_up/${session_id}`, {
      //[]: create message that action was successful
      method: "DELETE",
    });
  }

  function handleAddNote(tuteeId, tuteeName) {
    //[x]: link add note to user store
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
                  user.tutorSignUps.map((signUp) => {
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
                            onClick={() => handleDropEntireSession(signUp.id)}
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
                  user.bookedAsTutor.map((slot) => {
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
                            onClick={() => handleDropBookedSession(slot.id)}
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
