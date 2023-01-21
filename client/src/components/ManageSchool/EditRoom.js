import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//TODO remove useAuth
function EditRoom({ closeForm, room_id = 0, resources_name }) {
  const auth = useAuth();

  const [roomForm, setRoomForm] = useState({
    id: room_id,
    name: resources_name[1],
    building_name: resources_name[0],
    building_id: 0,
  });

  const [errors, setErrors] = useState([]);

  function renderErrors() {
    //[]: link to errors from school store
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

  function handleRoomFormOnChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setRoomForm({ ...roomForm, [name]: value });
  }

  function handleEditRoomSubmit(e) {
    e.preventDefault();
    setErrors([]); //[]:link to clear error in school store
    let saved_room;
    let saved_index;
    let removed_room_building;
    let updated_room_building;
    let new_rooms;
    let updated_rooms;
    //[]: link to action to edit room is school store
    //https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
    let locations = [...auth.currentUser.school.locations];
    // Logic is complicated make sure you trace and underrstand before handeling store
    if (roomForm.name !== resources_name[1]) {
      locations.forEach((location) => {
        location.rooms.forEach((room) => {
          if (room.id === roomForm.id) {
            room.name = roomForm.name
          }
        })
      });
    }
    if (roomForm.building_name !== resources_name[0]) {
      locations.forEach((location) => {
        location.rooms.forEach((room, index) => {
          if (room.id === roomForm.id) {
            new_rooms = [...location.rooms];
            removed_room_building = location.building.id;
            saved_room = room;
            saved_index = index;
          }
        });
        new_rooms.splice(saved_index, 1);
      });
      locations.forEach((location) => {
        if (location.building.name === roomForm.building_name) {
          saved_room.building_id = location.building.id;
          updated_room_building = location.building.id;
          updated_rooms = [...location.rooms, saved_room];
        }
      });
      locations.forEach((location) => {
        if (location.building.id === removed_room_building) {
          location.rooms = new_rooms
        }
        if (location.building.id === updated_room_building) {
          location.rooms = updated_rooms
        }
      });
    }
    closeForm();

    fetch(`/room/${room_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((room) => {}); //[]: create message that action happened??
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));//[]: link to errors in school store
      }
    });
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleEditRoomSubmit(e)}
      >
        <Form.Control
          type="text"
          placeholder="Room Name"
          value={roomForm.name}
          onChange={handleRoomFormOnChange}
          name="name"
        />
        <Form.Control
          type="text"
          placeholder="Building Name"
          value={roomForm.building_name}
          onChange={handleRoomFormOnChange}
          name="building_name"
        />
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="primary" onClick={closeForm}>
          Cancel
        </Button>
        <br />
        <Form.Text className="text-danger">
          <ul>{renderErrors()}</ul>
        </Form.Text>
      </Form>
    </div>
  );
}

export default EditRoom;
