import { useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import TutoringSlotRender from "./TutoringSlotRender";

function TutoringSignUp({ callingComponent, handleDashboardKeyChange }) {
  const { user, school } = useSelector((store) => store);

  //[]: hook errors up to school store
  const [errors, setErrors] = useState([]);

  
  function handleSetErrors(inputErrors) {
    setErrors(inputErrors);
  }

  function renderErrors() {
    const error_text = errors.map((error, index) => {
      return (
        <li key={index}>
          {error[0]}
          <ul>
            {error[1].map((text) => (
              <li>{text}</li>
            ))}
          </ul>
        </li>
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
            setErrors={handleSetErrors}
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
              setErrors={handleSetErrors}
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
            <ul>{renderErrors()}</ul>
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
        </Container>
      ) : (
        <h1> Loading....</h1>
      )}
    </>
  );
}

export default TutoringSignUp;
