import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { removeBookedTimeSlots } from "../ManageUsers/userSlice";

function SessionRender() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleDropSession(sessionId) {
    //[x]hook this drop session to school store
    dispatch(removeBookedTimeSlots(sessionId))
    
    //[]: create message that that action was successful
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
            {user.isLoggedIn ? (
              user.bookedSlots.map((slot) => {
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
                        onClick={() => handleDropSession(slot.id)}
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
