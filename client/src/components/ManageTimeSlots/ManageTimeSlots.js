// import { useAuth } from "../../context/AuthProvider";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import CreateTutoringTimeSlots from "./CreateTutoringTimeSlots";
import EditTutoringTimeSlots from "./EditTutoringTimeSlots";

function ManageTimeSlots() {
  // const auth = useAuth();
  // const user = auth.currentUser;
  const { user, school } = useSelector((state) => state);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  function handleRemoveTutoringSlot(slot_index, slot_id) {
    let newSchool = JSON.parse(JSON.stringify(school));
    let time_slots = newSchool.tutoringTimeSlots;
    time_slots.splice(slot_index, 1);
    // auth.updateCurrentUser(new_user);

    fetch(`/tutoring_time_slots/${slot_id}`, {
      method: "DELETE",
    });
  }

  function handleModalAction(modal_type, id = 0, resources = [], index = 0) {
    if (modal_type === "createSlot") {
      setModalTitle("Create Tutoring Time Slot");
      setModalBody(<CreateTutoringTimeSlots closeForm={handleCloseModal} />);
    } else if (modal_type === "editSlot") {
      setModalTitle("Edit Tutoring Time Slot");
      setModalBody(
        <EditTutoringTimeSlots
          closeForm={handleCloseModal}
          slotInfo={resources}
          index={index}
        />
      );
    }
    handleShowModal();
  }

  return (
    <>
      <h3> Current Resources</h3>
      <Container>
        <Button
          variant="success"
          onClick={() => handleModalAction("createSlot")}
        >
          Create New Tutoring Session
        </Button>
        {!user.isLoading ? (
          JSON.parse(JSON.stringify(school.locations))
            .sort((a, b) => (a.building.id > b.building.id ? 1 : -1))
            .map((buildingInfo) => {
              return (
                <Row key={buildingInfo.building.id}>
                  <h3>{buildingInfo.building.name}</h3>
                  {JSON.parse(JSON.stringify(buildingInfo.rooms))
                    .sort((a, b) => (a.id > b.id ? 1 : -1))
                    .map((rooms) => {
                      return (
                        <Row key={rooms.id}>
                          <Row>
                            <h5>{rooms.name}</h5>
                          </Row>
                          <Row>
                            <Table responsive="md" bordered hover>
                              <thead>
                                <tr>
                                  <th>Session</th>
                                  <th className="text-center">Start Time</th>
                                  <th className="text-center">End Time</th>
                                  <th className="text-center">
                                    Tutor Capacity
                                  </th>
                                  <th className="text-center">
                                    Tutee Capacity
                                  </th>
                                  <th className="text-center">Booked Status</th>
                                  <th className="text-center">Tutor Status</th>
                                  <th className="text_center">Actions</th>
                                </tr>
                              </thead>
                              {JSON.parse(
                                JSON.stringify(school.tutoringTimeSlots)
                              )
                                .sort((a, b) =>
                                  new Date(a.date_sort).getTime() >
                                  new Date(b.date_sort).getTime()
                                    ? 1
                                    : -1
                                )
                                .map((slot, index) => {
                                  return (
                                    <tbody key={slot.id}>
                                      {slot.room_id === rooms.id ? (
                                        <tr>
                                          <td>
                                            {new Date(
                                              slot.start_time
                                            ).toDateString()}
                                          </td>
                                          <td className="text-center">
                                            {new Date(
                                              slot.start_time
                                            ).toLocaleTimeString()}
                                          </td>
                                          <td className="text-center">
                                            {new Date(
                                              slot.end_time
                                            ).toLocaleTimeString()}
                                          </td>
                                          <td className="text-center">
                                            {slot.tutor_capacity}
                                          </td>
                                          <td className="text-center">
                                            {slot.tutee_capacity}
                                          </td>
                                          <td className="text-center">
                                            {slot.booked_status
                                              ? "Full"
                                              : "Open"}
                                          </td>
                                          <td className="text-center">
                                            {slot.open_status
                                              ? "Tutors signed up"
                                              : "No Tutors"}
                                          </td>
                                          <td>
                                            <Button
                                              className="mb-2"
                                              variant="success"
                                              onClick={() =>
                                                handleModalAction(
                                                  "editSlot",
                                                  slot.id,
                                                  slot,
                                                  index
                                                )
                                              }
                                            >
                                              Edit
                                            </Button>{" "}
                                            <Button
                                              variant="success"
                                              className="mb-2"
                                              onClick={() =>
                                                navigate(
                                                  `/tutoring_time_slots/${slot.id}`,
                                                  { replace: true }
                                                )
                                              }
                                            >
                                              View
                                            </Button>{" "}
                                            <Button
                                              className="mb-2"
                                              variant="success"
                                              onClick={() =>
                                                handleRemoveTutoringSlot(
                                                  index,
                                                  slot.id
                                                )
                                              }
                                            >
                                              Remove
                                            </Button>
                                          </td>
                                        </tr>
                                      ) : null}
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
            })
        ) : (
          <h4>Loading....</h4>
        )}
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}

export default ManageTimeSlots;
