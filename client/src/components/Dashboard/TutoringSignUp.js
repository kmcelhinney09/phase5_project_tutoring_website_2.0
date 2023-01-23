import { useSelector } from "react-redux";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import TutoringSlotRender from "./TutoringSlotRender";

function TutoringSignUp({ callingComponent, handleDashboardKeyChange }) {
  const { user, school } = useSelector((store) => store);

  const [showSessionMessage, setShowSessionMessage] = useState(false);
  const toggleShowSessionMessage = () =>
    setShowSessionMessage(!showSessionMessage);

  function renderErrors(errors) {
    const error_text = errors.map((error, index) => {
      return (
        <ul key={index}>
          <li>
            {error[0]}
            <ul>
              <li>{error[1]}</li>
            </ul>
          </li>
        </ul>
      );
    });
    return error_text;
  }

  function handle_closed_sessions(session) {
    if (callingComponent === "TutoringSignUp") {
      if (session.open_status === true) {
        return (
          <TutoringSlotRender
            slotInfo={session}
            handleDashboardKeyChange={handleDashboardKeyChange}
            callingComponent={callingComponent}
            toggleShowSessionMessage={toggleShowSessionMessage}
          />
        );
      } else {
        return null;
      }
    } else {
      if (session.tutors.length < session.tutor_capacity) {
        let tutorsIds = [];
        session.tutors.forEach((tutor) => {
          if (!tutorsIds.includes(tutor.id)) {
            tutorsIds.push(tutor.id);
          }
        });
        if (!tutorsIds.includes(user.id)) {
          return (
            <TutoringSlotRender
              slotInfo={session}
              handleDashboardKeyChange={handleDashboardKeyChange}
              callingComponent={callingComponent}
              toggleShowSessionMessage={toggleShowSessionMessage}
            />
          );
        } else {
          return null;
        }
      }
    }
  }
  return (
    <>
      {!school.isLoading ? (
        <Container>
          <Row>
            <h1>{school.name}</h1>
            {school.errorText.length > 0 ? (
              <ul>{renderErrors(school.errorText)}</ul>
            ) : null}
          </Row>
          <Row>
            {school.locations.map((buildingInfo) => {
              return (
                <Row key={buildingInfo.building.id}>
                  <h3>{buildingInfo.building.name}</h3>
                  {buildingInfo.rooms.map((rooms) => {
                    return (
                      <Row key={rooms.id}>
                        <Row>
                          <h5>{rooms.name}</h5>
                        </Row>
                        <Row>
                          <Table responsive="md">
                            <thead>
                              <tr>
                                <th className="text-center">Session</th>
                                <th className="text-center">Tutor</th>
                                <th className="text-center">
                                  Subjects Covered
                                </th>
                                <th className="text-center">Start Time</th>
                                <th className="text-center">End Time</th>
                                <th className="text-center">Open Slots</th>
                                <th className="text-center">Status</th>
                              </tr>
                            </thead>
                            {school.tutoringTimeSlots.map((slot) => {
                              return (
                                <tbody key={slot.id}>
                                  {slot.room_id === rooms.id
                                    ? handle_closed_sessions(slot)
                                    : null}
                                </tbody>
                              );
                            })}
                          </Table>
                        </Row>
                      </Row>
                    );
                  })}
                </Row>
              );
            })}
          </Row>
          <ToastContainer clasname="p-3" position={"top-center"}>
            <Toast
              show={showSessionMessage}
              onClose={toggleShowSessionMessage}
              className="d-inline-block m-1"
              bg={"warning"}
              delay={5000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Session Message</strong>
              </Toast.Header>
              <Toast.Body>You can not sign up for the same session!</Toast.Body>
            </Toast>
          </ToastContainer>
        </Container>
      ) : (
        <h1> Loading....</h1>
      )}
    </>
  );
}

export default TutoringSignUp;
