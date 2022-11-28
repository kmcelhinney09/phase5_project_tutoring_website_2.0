import { useAuth } from "../context/AuthProvider"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

function SessionsTutored() {
  const booked_as_tutor = useAuth().currentUser.booked_as_tutor;
  console.log(booked_as_tutor)
  return (
    <Container>
      <Row>
        <h4>Sessions as Tutor</h4>
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
            {booked_as_tutor.length !== 0 ? (
              booked_as_tutor.map((slot) => {
                return (
                  <tr key={slot.id}>
                    <td>{slot.location}</td>
                    <td>{slot.date}</td>
                    <td>
                      {slot.start_time}-{slot.end_time}
                    </td>
                    <td>{slot.tutee.full_name}</td>
                    <td>
                      <Button>Drop Session</Button>{" "}
                      <Button>Leave Note</Button>
                    </td>
                  </tr>
                );
              })
            ) : (<tr>
              <td>No Current Sessions</td>
            </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default SessionsTutored