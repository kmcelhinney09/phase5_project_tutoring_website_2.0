import React from "react";
// import { useAuth } from "../../context/AuthProvider";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

function SessionRender() {
  // const auth = useAuth();
  // const user = auth.currentUser;
  const user = useSelector((state) => state.user)

  function handleDropSession(sessionId, sessionIndex) {
    let newUser = JSON.parse(JSON.stringify(user));
    let updatedBookedSlots = newUser.bookedSlots;
    updatedBookedSlots.splice(sessionIndex, 1);
    // auth.updateCurrentUser(newUser);

    fetch(`/booked_slot/${sessionId}`, {
      method: "DELETE",
    });
  }

  return (
    <Container>
      <Row>
        <h4>Tutoring Sessions</h4>
        <Table responsive="md">
          <thead>
            <tr>
              <th>Location</th>
              <th>Session</th>
              <th>Time</th>
              <th>Tutor</th>
              <th>Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.bookedSlots.length !== 0 ? (
              user.bookedSlots
                .sort((a, b) => (a.date_sort > b.date_sort ? 1 : -1))
                .map((slot, index) => {
                  return (
                    <tr key={slot.id}>
                      <td>{slot.location}</td>
                      <td>{slot.date}</td>
                      <td>
                        {slot.start_time}-{slot.end_time}
                      </td>
                      <td>{slot.tutor.full_name}</td>
                      <td>{slot.tutor.subjects_covered}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => handleDropSession(slot.id, index)}
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
    </Container>
  );
}

export default SessionRender;
