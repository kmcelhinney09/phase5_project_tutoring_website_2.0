import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateRoom({ closeForm, building_id }) {
  const auth = useAuth();
  const user = auth.currentUser;

  const [roomForm, setRoomForm] = useState({
    name: "",
    building_id: 0,
  });
  const [errors, setErrors] = useState([]);

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

  function handleRoomFormOnChange(e) {
    let value = e.target.value;
    setRoomForm({ name: value, building_id: building_id });
  }

  function handleCreateRoomSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let new_user = JSON.parse(JSON.stringify(user));
    let locations = new_user.school.locations;

    let updated_locations = locations.map((location) => {
      if (location.building.id === building_id) {
        location.rooms.push(roomForm);
      }
      return location;
    });
    new_user.school.locations = updated_locations;
    auth.updateCurrentUser(new_user);
    closeForm();

    fetch("/room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((room) => {
          auth.auto();
        });
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));
      }
    });
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleCreateRoomSubmit(e)}
      >
        <Form.Control
          type="text"
          placeholder="Room Name"
          value={roomForm.name}
          onChange={handleRoomFormOnChange}
          name="name"
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

export default CreateRoom;
