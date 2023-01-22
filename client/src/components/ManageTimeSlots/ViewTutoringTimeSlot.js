import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

function ViewTutoringTimeSlot() {
  const [tutoringSlotInfo, setTutoringSlotInfo] = useState(false);
  const [errors, setErrors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/tutoring_time_slots/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          //[]: create message that action successful
          setTutoringSlotInfo(data);
          setRefresh(false);
        });
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));
      }
    });
  }, [id]);
  console.log(tutoringSlotInfo);
  function handleDropTutor(tutor_id, tutor_index) {
    //[]: link drop tutor to school store
    let new_slot = JSON.parse(JSON.stringify(tutoringSlotInfo));
    let tutors = new_slot.tutors;
    let bookedSlots = new_slot.booked_slots;
    let tutor_signup_id;
    tutors.splice(tutor_index, 1);
    new_slot.booked_slots = bookedSlots.filter(
      (slot) => slot.tutor.id !== tutor_id
    );
    setTutoringSlotInfo(new_slot);
    tutoringSlotInfo.tutor_slot_sign_ups.forEach((sign_up) => {
      if (sign_up.tutor_id === tutor_id) {
        tutor_signup_id = sign_up.id;
      }
    });

    fetch(`/tutor_slot_sign_up/${tutor_signup_id}`, {
      method: "DELETE", //[]: create message that action was successful
    });
    setRefresh(true);
  }

  function handleDropBookedSession(session_id, session_index) {
    let new_booked_slot = JSON.parse(JSON.stringify(tutoringSlotInfo));
    new_booked_slot.booked_slots.splice(session_index, 1);
    setTutoringSlotInfo(new_booked_slot);
    //[]: link drop booked session to user store
    fetch(`/booked_slot/${session_id}`, {
      method: "DELETE", //[]: create message that action was sucessful
    });
    setRefresh(true);
  }

  function renderErrors() {
    const error_text = errors.map((error, index) => {
      return (
        <li key={index}>
          {error[0]}
          <ul>
            <li>{error[1]}</li>
          </ul>
        </li>
      );
    });
    return error_text;
  }

  function render_booked_slots(slots_info) {
    let slot_details;
    slots_info.length !== 0
      ? (slot_details = tutoringSlotInfo.booked_slots.map((slot, index) => {
          return (
            <tr key={slot.id}>
              <td>{slot.tutor.full_name}</td>
              <td>{slot.tutee.full_name}</td>
              <td>{slot.created_at}</td>
              <td>
                <Button onClick={() => handleDropBookedSession(slot.id, index)}>
                  Drop Booked Session
                </Button>
              </td>
            </tr>
          );
        }))
      : (slot_details = (
          <tr>
            <td>
              <strong>No Booked Sessions</strong>
            </td>
          </tr>
        ));
    return slot_details;
  }
  return (
    <Container>
      <Row>
        <h1>{tutoringSlotInfo.location_render}</h1>
        <h2>{`${tutoringSlotInfo.date} from ${tutoringSlotInfo.start_time} to ${tutoringSlotInfo.end_time}`}</h2>
      </Row>
      <Row>
        <h4>Tutoring Time Slot Details</h4>
        {errors && <ul>{renderErrors()}</ul>}
        <Table responsive="md" bordered hover>
          <thead>
            <tr>
              <th>Tutor Capacity</th>
              <th>Tutee Capacity</th>
              <th>Remaining Tutee space</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tutoringSlotInfo.tutor_capacity}</td>
              <td>{tutoringSlotInfo.tutee_capacity}</td>
              <td>{tutoringSlotInfo.tutee_space}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <h4>Tutors Signed Up</h4>
      </Row>
      <Row>
        <Table responsive="md" bordered hover>
          <thead>
            <tr>
              <th>Tutor Name</th>
              <th>Subjects Covered</th>
              <th>Grade Level</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {tutoringSlotInfo
              ? tutoringSlotInfo.tutors.map((tutor, index) => {
                  return (
                    <tr key={tutor.id}>
                      <td>{tutor.full_name}</td>
                      <td>{tutor.subjects_covered}</td>
                      <td>{tutor.grade}</td>
                      <td>
                        <Button
                          onClick={() => handleDropTutor(tutor.id, index)}
                        >
                          Drop Tutor
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : null}
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
            {tutoringSlotInfo.booked_slots ? (
              render_booked_slots(tutoringSlotInfo.booked_slots)
            ) : (
              <tr>
                <td>
                  <strong>Loading...</strong>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default ViewTutoringTimeSlot;
