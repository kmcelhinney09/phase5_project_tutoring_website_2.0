import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editRoomInfo } from "./schoolSlice";

function EditRoom({ closeForm, room_id = 0, resources_name }) {
  const isLoading = useSelector((store) => store.user.isLoading);
  const locations = useSelector((store) => store.school.locations);
  const errorText = useSelector((store) => store.school.errorText);
  const renderErrorMessage = useSelector(
    (store) => store.school.renderErrorMessage
  );

  const dispatch = useDispatch();
  const [roomForm, setRoomForm] = useState({
    id: room_id,
    name: resources_name[1],
    building_name: resources_name[0],
    building_id: 0,
  });

  function renderErrors(errors) {
    const error_text = errors.map((error, index) => {
      return (
        <ul key={index}>
          <li>
            {error[0]}
            <ul>
              <li>{error[1]}</li>
            </ul>
          </li>
        </ul>
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
    dispatch(editRoomInfo(roomForm));
    if (renderErrorMessage === false) {
      closeForm();
    }
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
        {errorText.length > 0 && (
          <Form.Text className="text-danger">
            {renderErrors(errorText)}
          </Form.Text>
        )}
      </Form>
    </div>
  );
}

export default EditRoom;
