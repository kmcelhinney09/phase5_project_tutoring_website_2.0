import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

function ViewTutoringTimeSlot() {
  const [tutoringSlotInfo, setTutoringSlotInfo] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/tutoring_time_slots/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("TutoringTimeSlostData: ", data);
          setTutoringSlotInfo(data);
        });
      }
    });
  }, [id]);

  function render_tutors(tutor_list) {
    if (tutoringSlotInfo) {
      let tutors = [];
      tutor_list.forEach((tutor) => {
        tutors.push(`${tutor.full_name}: ${tutor.subjects_covered}`);
      });
      return tutors.join(", \n");
    } else {
      return null;
    }
  }

  return (
    <Container>
      <Row>
        <h1>{tutoringSlotInfo.location_render}</h1>
        <h2>{`${tutoringSlotInfo.date} from ${tutoringSlotInfo.start_time} to ${tutoringSlotInfo.end_time}`}</h2>
      </Row>
      <Row>
        <h4>Tutoring Time Slot Details</h4>
        <Table responsive="md" bordered hover>
          <thead>
            <tr>
              <th>Tutor Capacity</th>
              <th>Tutee Capacity</th>
              <th>Tutors Signed Up</th>
              <th>Remaining Tutee space</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tutoringSlotInfo.tutor_capacity}</td>
              <td>{tutoringSlotInfo.tutee_capacity}</td>
              <td>
                <pre>{render_tutors(tutoringSlotInfo.tutors)}</pre>
              </td>
              <td>{tutoringSlotInfo.tutee_space}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <h4>Sign Ups for Time Slot</h4>
      </Row>
      <Row>
        <Table responsive="md" striped bordered hover>
          <thead>
            <tr>
              <th>Tutor</th>
              <th>Tutee</th>
              <th>Date Booked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutoringSlotInfo.boooked_slot ? (
              tutoringSlotInfo.booked_slots.map((slot) => {
                return (
                  <tr>
                    <td>{slot.tutor.full_name}</td>
                    <td>{slot.tutee.full_name}</td>
                    <td>{slot.created_at}</td>
                    <td><Button>Drop Session</Button></td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td><strong>No Booked Sessions</strong></td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default ViewTutoringTimeSlot;
