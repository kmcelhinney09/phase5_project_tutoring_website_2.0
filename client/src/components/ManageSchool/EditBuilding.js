import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditBuilding({ closeForm, building_id, school_id, building_name }) {
  const auth = useAuth();
  const user = auth.currentUser;

  const [buildingForm, setBuildingForm] = useState({
    id: building_id,
    name: building_name,
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

  function handleBuildingFormOnChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setBuildingForm({ ...buildingForm, [name]: value });
  }

  function handleEditBuildingSubmit(e) {
    e.preventDefault();
    setErrors([]);
    //https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
    let new_user = JSON.parse(JSON.stringify(user));
    let locations = JSON.parse(JSON.stringify(new_user.school.locations));

    locations = locations.map((location) => {
      if (location.building.name !== buildingForm.name) {
        if (location.building.id === buildingForm.id) {
          location.building.name = buildingForm.name;
          return location;
        } else {
          return location;
        }
      } else {
        return location;
      }
    });
    new_user.school.locations = locations;
    auth.updateCurrentUser(new_user);

    closeForm();
    fetch(`/building/${building_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildingForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((building) => {
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
