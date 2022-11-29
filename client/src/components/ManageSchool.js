import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import CreateBuilding from "./CreateBuilding";
import CreateRoom from "./CreateRoom";
import EditRoom from "./EditRoom";

function ManageSchool() {
  const user = useAuth().currentUser;
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  function handleModalAction(modal_type, id = 0, resources_name = []) {
    if (modal_type === "create room") {
      setModalTitle("Create Room");
      setModalBody(
        <CreateRoom closeForm={handleCloseModal} resource_id={id} />
      );
    } else if (modal_type === "create building") {
      setModalTitle("Create Building");
      setModalBody(
        <CreateBuilding
          closeForm={handleCloseModal}
          school_id={user.school.id}
        />
      );
    } else {
      setModalTitle(modal_type);
      setModalBody(
        <EditRoom
          closeForm={handleCloseModal}
          room_id={id}
          resources_name={resources_name}
        />
      );
    }
    handleShowModal();
  }
  //TODO: Put Create Room under edit building (bilding.room.create)
  // TODO: Make Room Remove button functional
  //TODO: Make Remove bilding button functional
  //TODO: Make Edit building button functional
  
  return (
    <>
      <h3> Current Resources</h3>
      {user.id ? (
        user.school.locations
          .sort((a, b) => (a.building.id > b.building.id ? 1 : -1))
          .map((buildingInfo) => {
            return (
              <Container key={buildingInfo.building.id}>
                <Row>
                  <h5>{buildingInfo.building.name}</h5>
                </Row>
                <Row>
                  <Table responsive="md" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Room</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildingInfo.rooms
                        .sort((a, b) => (a.id > b.id ? 1 : -1))
                        .map((room) => {
                          return (
                            <tr key={room.id}>
                              <td>{room.name}</td>
                              <td className="text-center">
                                <Button
                                  variant="success"
                                  onClick={() =>
                                    handleModalAction(
                                      `Edit ${room.name}`,
                                      room.id,
                                      [buildingInfo.building.name, room.name]
                                    )
                                  }
                                >
                                  Edit
                                </Button>{" "}
                                <Button variant="success">
                                  {" "}
                                  Remove Room
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Row>
                <Button
                  className="mb-2"
                  variant="success"
                  onClick={() =>
                    handleModalAction("create room", buildingInfo.building.id)
                  }
                >
                  Create New Room
                </Button>{" "}
                <Button className="mb-2" variant="success">
                  Edit Building
                </Button>{" "}
                <Button className="mb-2" variant="success">
                  Remove Building
                </Button>
              </Container>
            );
          })
      ) : (
        <h4>Loading....</h4>
      )}
      <Button
        variant="success"
        onClick={() => handleModalAction("create building")}
      >
        Create New Building
      </Button>{" "}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}

export default ManageSchool;
