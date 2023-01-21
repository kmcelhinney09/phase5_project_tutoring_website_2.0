import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewBuilding } from "./schoolSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateBuilding({ closeForm, school_id }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]); //[]: link to error handeling

  const [buildingForm, setBuildingForm] = useState({
    name: "",
    school_id: school_id,
  });

  function renderErrors() {
    // []: link errors to school store
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
    let value = e.target.value;
    let name = e.target.name;
    setBuildingForm({ ...buildingForm, [name]: value });
  }

  function handleCreateBuildingSubmit(e) {
    e.preventDefault();
    setErrors([]); //[]: link to error handeling
    //[]: link to action to add building to school store
    dispatch(addNewBuilding(buildingForm));
    closeForm();
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleCreateBuildingSubmit(e)}
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

export default CreateBuilding;
