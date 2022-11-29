import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import CreateBuilding from "./CreateBuilding";

function ManageSchool() {
  const user = useAuth().currentUser;
  const [showCreateBuilding, setShowCreateBuilding] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const handleCloseCreateBuilding = () => setShowCreateBuilding(false);
  const handleShowCreateBuilding = () => setShowCreateBuilding(true);

  const handleCloseCreateRoom = () => setShowCreateRoom(false);
  const handleShowCreateRoom = () => setShowCreateRoom(true);

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
                                <Button>Edit</Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Row>
                <Button className="mb-2">Create New Room</Button>
                <Modal
                  show={showCreateBuilding}
                  onHide={handleCloseCreateBuilding}
                >
                  <Modal.Header>
                    <Modal.Title>Create New Building</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreateBuilding
                      closeForm={handleCloseCreateBuilding}
                      school_id={user.school.id}
                    />
                  </Modal.Body>
                </Modal>
                <Modal
                  show={showCreateBuilding}
                  onHide={handleCloseCreateBuilding}
                />
                <Modal
                  show={showCreateBuilding}
                  onHide={handleCloseCreateBuilding}
                >
                  <Modal.Header>
                    <Modal.Title>Create New Room</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreateBuilding
                      closeForm={handleCloseCreateBuilding}
                      school_id={user.school.id}
                    />
                  </Modal.Body>
                </Modal>
                <Modal
                  show={showCreateBuilding}
                  onHide={handleCloseCreateBuilding}
                />
              </Container>
            );
          })
      ) : (
        <h4>Loading....</h4>
      )}
      <Button variant="success" onClick={handleShowCreateBuilding}>
        Create New Building
      </Button>
    </>
  );
}

export default ManageSchool;
