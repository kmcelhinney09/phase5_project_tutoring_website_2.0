import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateBuilding({ closeForm, school_id }) {
  const auth = useAuth();
  // const user = auth.currentUser;

  const [createBuilding, setCreateBuilding] = useState(false);
  const [buildingForm, setBuildingForm] = useState([]);

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
          console.log(building);
          auth.auto();
        });
      } else {
        // res.json().then((e) => setErrors(Object.entries(e.error)));
        res.json().then((e) => console.log(Object.entries(e.error)));
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
          <ul></ul>
        </Form.Text>
      </Form>
    </div>
  );
}

export default CreateBuilding;
