import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editBuildingInfo } from "./schoolSlice";

function EditBuilding({ closeForm, building_id, building_name }) {
  const errorText = useSelector((store) => store.school.errorText);
  const renderErrorMessage = useSelector(
    (store) => store.school.renderErrorMessage
  );
  const dispatch = useDispatch();

  const [buildingForm, setBuildingForm] = useState({
    id: building_id,
    name: building_name,
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

  function handleBuildingFormOnChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setBuildingForm({ ...buildingForm, [name]: value });
  }

  function handleEditBuildingSubmit(e) {
    e.preventDefault();
    //[x]: link to edit building action in school store
    dispatch(editBuildingInfo(buildingForm));
    if (renderErrorMessage === false) {
      closeForm();
    }
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
        {errorText.length > 0 && (
          <Form.Text className="text-danger">
            {renderErrors(errorText)}
          </Form.Text>
        )}
      </Form>
    </div>
  );
}

export default EditBuilding;
