import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function TimeSlotForm({ slotForm, setSlotForm, handleSlotSubmit, closeForm }) {
  const { user, school } = useSelector((store) => store);
  const [roomSelection, setRoomSelection] = useState("");

  useEffect(() => {
    if (slotForm.building !== "") {
      handleGetRooms(slotForm.building);
    }
  }, [slotForm]);

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

  function handleSlotFormOnChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "tutee_capacity" || name === "tutor_capacity") {
      value = parseInt(value);
    }
    if (name === "building") {
      handleGetRooms(value);
    }
    setSlotForm({ ...slotForm, [name]: value });
  }

  function handleGetRooms(buildingName) {
    if (buildingName === "Select a building") {
      setRoomSelection(false);
    } else {
      let rooms;
      school.locations.forEach((location) => {
        if (location.building.name === buildingName) {
          rooms = location.rooms;
        }
      });

      const room_options = rooms.map((room) => {
        return room.name;
      });
      room_options.unshift("Select A Room");
      setRoomSelection(room_options);
    }
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleSlotSubmit(e)}
      >
        <Form.Control
          type="date"
          onChange={handleSlotFormOnChange}
          value={slotForm.date}
          name="date"
        />
        <Form.Control
          type="time"
          value={slotForm.start_time}
          onChange={handleSlotFormOnChange}
          name="start_time"
        />
        <Form.Control
          type="time"
          value={slotForm.end_time}
          onChange={handleSlotFormOnChange}
          name="end_time"
        />
        <Form.Select
          onChange={handleSlotFormOnChange}
          name="building"
          value={slotForm.building}
        >
          <option value={"Select a building"}>Select a building</option>
          {user.id
            ? school.locations.map((location) => {
                return (
                  <option
                    key={location.building.id}
                    value={location.building.name}
                  >
                    {location.building.name}
                  </option>
                );
              })
            : null}
        </Form.Select>
        <Form.Select
          onChange={handleSlotFormOnChange}
          name="room"
          value={slotForm.room}
        >
          {roomSelection ? (
            roomSelection.map((room, index) => {
              return (
                <option key={index} value={room}>
                  {room}
                </option>
              );
            })
          ) : (
            <option>Pick a Building First</option>
          )}
        </Form.Select>
        <Form.Control
          type="number"
          onChange={handleSlotFormOnChange}
          name="tutor_capacity"
          value={slotForm.tutor_capacity}
        />
        <Form.Control
          type="number"
          onChange={handleSlotFormOnChange}
          name="tutee_capacity"
          value={slotForm.tutee_capacity}
        />
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="primary" onClick={closeForm}>
          Cancel
        </Button>
        <br />
        {school.errorText.length > 0 && (
          <Form.Text className="text-danger">
            {renderErrors(school.errorText)}
          </Form.Text>
        )}
      </Form>
    </div>
  );
}

export default TimeSlotForm;
