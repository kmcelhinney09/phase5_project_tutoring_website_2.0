import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import TutoringSlotRender from "./TutoringSlotRender";


function TutoringSignUp() {
  const user = useAuth().currentUser;
  const [tutoringInfo, setTutoringInfo] = useState(false);

  useEffect(() => {
    fetch(`/school/${user.school.id}/tutoring`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          // console.log("TutoringTimeSlostData: ", data);
          setTutoringInfo(data);
        });
      }
    });
  }, [user.school.id]);

  return (
    <>
      {tutoringInfo.id ? (
        <Container>
          <Row>
            <h1>{tutoringInfo.name}</h1>
          </Row>
          <Row>
            {tutoringInfo.locations
              .sort((a, b) => (a.building.id > b.building.id ? 1 : -1))
              .map((buildingInfo) => {
                return (
                  <Row key={buildingInfo.building.id}>
                    <h3>{buildingInfo.building.name}</h3>
                    {buildingInfo.rooms
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                      .map((rooms) => {
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
                                {tutoringInfo.tutoring_time_slots
                                  .sort((a, b) =>
                                    a.date_sort > b.date_sort ? 1 : -1
                                  )
                                  .map((slot) => {
                                    return (
                                      <tbody key={slot.id}>
                                        {slot.room_id === rooms.id
                                          ? <TutoringSlotRender slot_info={slot}/>
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
