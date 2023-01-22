import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addNewRoom } from "./schoolSlice";

function CreateRoom({ closeForm, building_id }) {
  const dispatch = useDispatch();
  const [roomForm, setRoomForm] = useState({
    name: "",
    building_id: 0,
  });
  const [errors, setErrors] = useState([]);

  function renderErrors() {
    //[]: link errors to school store
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
    //[x]: link to action for adding room to school store
    dispatch(addNewRoom(roomForm));
    closeForm();
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
