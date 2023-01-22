// import { useAuth } from "../../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
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
import ActionMessage from "../ActionMessage";
import {
  removeBuildingAndItsRooms,
  removeRoom,
  removeSchoolSubject,
  setServerError,
  clearError,
} from "./schoolSlice";

function ManageSchool() {
  const { school, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearError);
  };
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
    } else if (modal_type === "renderError") {
      setModalTitle("Error");
      setModalBody(
        <ActionMessage
          closeForm={handleCloseModal}
          actionMessage={school.errorText}
          bgcolor="danger"
        />
      );
    }
    handleShowModal();
  }

  function handleRemoveRoom(room_id) {
    //[x]: link to remove room action in school store
    dispatch(removeRoom(room_id));
    fetch(`/room/${room_id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        dispatch(setServerError({ error: [res.status, res.statusText] }));
        handleModalAction("renderError");
      }
    });
  }

  function handleRemoveBuilding(building_id) {
    //[x]: link to action to remove building in school store
    let building_index;
    school.locations.forEach((location, index) => {
      if (location.building.id === building_id) {
        building_index = index;
      }
    });

    dispatch(removeBuildingAndItsRooms(building_index));

    fetch(`/building/${building_id}`, {
      //[]: create message that action was successful
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        dispatch(setServerError({ error: [res.status, res.statusText] }));
        handleModalAction("renderError");
      }
    });
  }

  function handleRemoveSubject(subjectId) {
    //[x]: link to action to remove subject from school store
    dispatch(removeSchoolSubject(subjectId));

    fetch(`/subject/${subjectId}`, {
      //[]: create message that action was successful
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        dispatch(setServerError({ error: [res.status, res.statusText] }));
        handleModalAction("renderError");
      }
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
              {school.subjects.map((subject) => {
                return (
                  <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleRemoveSubject(subject.id)}
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
