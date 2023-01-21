import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//TODO remove useAuth
function CreateBuilding({ closeForm, school_id }) {
  const auth = useAuth();
  const [errors, setErrors] = useState([])

  const [createBuilding, setCreateBuilding] = useState(false);
  const [buildingForm, setBuildingForm] = useState([]);

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
    setBuildingForm({ name: value, school_id: school_id });
    let new_building = {
      building: { name: value, school_id: school_id },
      rooms: [],
    };
    setCreateBuilding(new_building);
  }

  function handleCreateBuildingSubmit(e) {
    e.preventDefault();
    setErrors([])
    //[]: link to action to add building to school store
    let new_user = JSON.parse(JSON.stringify(auth.currentUser));
    let locations = new_user.school.locations;
    locations.push(createBuilding);
    new_user.school.locations = locations;
    auth.updateCurrentUser(new_user);
    closeForm();
    fetch("/building", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildingForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((building) => {
          auth.auto(); //TODO: remove
          //[]: create message to action was successful
        });
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error))); //[]: link to errors
      }
    });
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
          value={createBuilding.name}
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
