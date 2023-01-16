// import { useAuth } from "../../context/AuthProvider";
import { useSelector } from "react-redux";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import CreateBuilding from "./CreateBuilding";
import CreateRoom from "./CreateRoom";
import EditRoom from "./EditRoom";
import EditBuilding from "./EditBuilding";
import AddSubject from "./AddSubject";
//-[ ] Remove useAuth
function ManageSchool() {
  // const auth = useAuth();
  // let user = auth.currentUser;
  const { school, user } = useSelector((state) => state);
  // const school = useSelector((state) => state.school)
  console.log(school);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  function handleModalAction(modal_type, id = 0, resources_name = []) {
    if (modal_type === "create room") {
      setModalTitle("Create Room");
      setModalBody(
        <CreateRoom closeForm={handleCloseModal} building_id={id} />
      );
    } else if (modal_type === "create building") {
      setModalTitle("Create Building");
      setModalBody(
        <CreateBuilding closeForm={handleCloseModal} school_id={school.id} />
      );
    } else if (modal_type === "edit building") {
      setModalTitle("Edit Building");
      setModalBody(
        <EditBuilding
          closeForm={handleCloseModal}
          building_id={id}
          school_id={school.id}
          building_name={resources_name[0]}
        />
      );
    } else if (modal_type === "Edit Room") {
      setModalTitle("Edit Room");
      setModalBody(
        <EditRoom
          closeForm={handleCloseModal}
          room_id={id}
          resources_name={resources_name}
        />
      );
    } else if (modal_type === "Create Subject") {
      setModalTitle("Add Subject");
      setModalBody(<AddSubject closeForm={handleCloseModal} />);
    }
    handleShowModal();
  }

  function handleRemoveRoom(room_id) {
    //[]: link to remove room action in school store
    let newSchool = JSON.parse(JSON.stringify(school));
    let locations = newSchool.locations;
    let new_rooms = [];
    let saved_index;
    let removed_room_building;

    locations.forEach((location) => {
      location.rooms.forEach((room, index) => {
        if (room.id === room_id) {
          new_rooms = [...location.rooms];
          removed_room_building = location.building.id;
          saved_index = index;
        }
      });
      if (new_rooms.length !== 0) {
        new_rooms.splice(saved_index, 1);
        locations.forEach((location) => {
          if (location.building.id === removed_room_building) {
            location.rooms = new_rooms;
          }
        });
      }
    });
    // auth.updateCurrentUser(new_user);

    fetch(`/room/${room_id}`, {
      //[]: create message that action was successful
      method: "DELETE",
    });
  }

  function handleRemoveBuilding(building_id) {
    //[]: link action to remove building in school store
    let newSchool = JSON.parse(JSON.stringify(school));
    let locations = newSchool.locations;
    let building_index;
    locations.forEach((location, index) => {
      if (location.building.id === building_id) {
        building_index = index;
      }
    });
    locations.splice(building_index, 1);
    // auth.updateCurrentUser(new_user);

    fetch(`/building/${building_id}`, {
      //[]: create message that action was successful
      method: "DELETE",
    });
  }

  function handleRemoveSubject(subjectId, subjectIndex) {
    //[]: link to action to remove subject from school store
    let newSchool = JSON.parse(JSON.stringify(school));
    let updatedSubject = newSchool.subjects;
    updatedSubject.splice(subjectIndex, 1);
    // auth.updateCurrentUser(newUser)

    fetch(`/subject/${subjectId}`, {
      //[]: create message that action was successful
      method: "DELETE",
    });
  }

  return (
    <>
      <h3> Current Resources</h3>
      <Button
        variant="success"
        onClick={() => handleModalAction("create building")}
      >
        Create New Building
      </Button>{" "}
      {school !== undefined ? (
        school.locations.map((buildingInfo) => {
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
                    {buildingInfo.rooms.map((room) => {
                      return (
                        <tr key={room.id}>
                          <td>{room.name}</td>
                          <td className="text-center">
                            <Button
                              variant="success"
                              onClick={() =>
                                handleModalAction(`Edit Room`, room.id, [
                                  buildingInfo.building.name,
                                  room.name,
                                ])
                              }
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="success"
                              onClick={() => handleRemoveRoom(room.id)}
                            >
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
              <Button
                className="mb-2"
                variant="success"
                onClick={() =>
                  handleModalAction("edit building", buildingInfo.building.id, [
                    buildingInfo.building.name,
                  ])
                }
              >
                Edit Building
              </Button>{" "}
              <Button
                className="mb-2"
                variant="success"
                onClick={() => handleRemoveBuilding(buildingInfo.building.id)}
              >
                Remove Building
              </Button>
            </Container>
          );
        })
      ) : (
        <h4>Loading....</h4>
      )}
      {user.id ? (
        <>
          <h4>School Subjects</h4>
          <Button
            variant="success"
            onClick={() => handleModalAction("Create Subject")}
          >
            Add Subject
          </Button>
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {school.subjects.map((subject, index) => {
                return (
                  <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleRemoveSubject(subject.id, index)}
                      >
                        Drop Subject
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <h4>Loading....</h4>
      )}
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
