import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editRoomInfo } from "./schoolSlice";

function EditRoom({ closeForm, room_id = 0, resources_name }) {
  const isLoading = useSelector((store) => store.user.isLoading);
  const locations = useSelector((store) => store.school.locations);

  const dispatch = useDispatch();
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
    setErrors([]); //[x]:link to clear error in school store
    dispatch(editRoomInfo(roomForm));
    closeForm();
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
        <Form.Select
          onChange={handleRoomFormOnChange}
          name="building_name"
          value={roomForm.building_name}
        >
          <option value={"Select a building"}>Select a building</option>
          {isLoading
            ? null
            : locations.map((location) => {
                return (
                  <option
                    key={location.building.id}
                    value={location.building.name}
                  >
                    {location.building.name}
                  </option>
                );
              })}
        </Form.Select>
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
