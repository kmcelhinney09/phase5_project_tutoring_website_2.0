import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addNewRoom } from "./schoolSlice";

function CreateRoom({ closeForm, building_id }) {
  const errorText = useSelector((store) => store.school.errorText);
  const renderErrorMessage = useSelector(
    (store) => store.school.renderErrorMessage
  );
  const dispatch = useDispatch();
  const [roomForm, setRoomForm] = useState({
    name: "",
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
    let value = e.target.value;
    setRoomForm({ name: value, building_id: building_id });
  }

  function handleCreateRoomSubmit(e) {
    e.preventDefault();
    //[x]: link to action for adding room to school store
    dispatch(addNewRoom(roomForm));
    if (renderErrorMessage === false) {
      closeForm();
    }
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
        {errorText.length > 0 && (
          <Form.Text className="text-danger">
            {renderErrors(errorText)}
          </Form.Text>
        )}
      </Form>
    </div>
  );
}

export default CreateRoom;
