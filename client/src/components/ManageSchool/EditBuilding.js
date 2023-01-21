import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editBuildingInfo } from "./schoolSlice";
//TODO remove useAuth
function EditBuilding({ closeForm, building_id, school_id, building_name }) {
  
  const dispatch = useDispatch();
  
  const [buildingForm, setBuildingForm] = useState({
    id: building_id,
    name: building_name,
  });

  const [errors, setErrors] = useState([]);

  function renderErrors() {
    //[]: link school errors to render errors
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

  function handleBuildingFormOnChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setBuildingForm({ ...buildingForm, [name]: value });
  }

  function handleEditBuildingSubmit(e) {
    e.preventDefault();
    setErrors([]); // []: link to clear erros in school errors
    //[x]: link to edit building action in school store
    dispatch(editBuildingInfo(buildingForm))
    closeForm();
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleEditBuildingSubmit(e)}
      >
        <Form.Control
          type="text"
          placeholder="Building Name"
          value={buildingForm.name}
          onChange={handleBuildingFormOnChange}
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

export default EditBuilding;
