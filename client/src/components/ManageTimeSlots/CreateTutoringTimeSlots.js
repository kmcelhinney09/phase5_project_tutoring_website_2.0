import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateTutoringTimeSlots({ closeForm }) {
  const auth = useAuth();
  const user = auth.currentUser;
  console.log(user);
  const [slotForm, setSlotForm] = useState({
    date: "",
    start_time: "",
    end_time: "",
    room: [],
    building: [],
    tutor_capacity: 0,
    tutee_capacity: 0,
  });
  const [roomSelection, setRoomSelection] = useState("");

  function handleSlotFormOnChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "room") {
      value = value.split(",");
    }
    if (name === "tutee_capacity" || name === "tutor_capacity") {
      value = parseInt(value);
    }
    console.log("Name:", name, "Value: ", value);
    setSlotForm({ ...slotForm, [name]: value });
  }

  function handleCreateSlotSubmit(e) {
    e.preventDefault();
    let new_user = JSON.parse(JSON.stringify(user));
    console.log(slotForm);
    //TODO: Try using date.toJSON() to send data to db
    let start_time = `${slotForm.date} ${slotForm.start_time}`;
    let end_time = `${slotForm.date} ${slotForm.end_time}`;
    const new_time_slot = {
      created_by: user.id,
      tutor_capacity: slotForm.tutor_capacity,
      tutee_capacity: slotForm.tutee_capacity,
      start_time: start_time,
      end_time: end_time,
      open_status: false,
      booked_status: false,
      school_id: user.school.id,
      room_id: parseInt(slotForm.room[0]),
    };
    new_user.school.tutoring_time_slots.push(new_time_slot);
    console.log(new_time_slot);
    auth.updateCurrentUser(new_user);
    closeForm();

    fetch("/tutoring_time_slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_time_slot),
    }).then((res) => {
      if (res.ok) {
        res.json().then((slot) => {
          console.log(slot);
          auth.auto();
        });
      } else {
        // res.json().then((e) => setErrors(Object.entries(e.error)));
        res.json().then((e) => console.log(Object.entries(e.error)));
      }
    });
  }

  function handleGetRooms(e) {
    let value = e.target.value;
    const name = e.target.name;
    value = value.split(",");
    if (value[1] === "Select a building") {
      setRoomSelection(false);
    } else {
      let rooms;
      const locations = user.school.locations;
      locations.forEach((location) => {
        console.log(location.building.id === parseInt(value[0]));
        if (location.building.id === parseInt(value[0])) {
          rooms = location.rooms;
        }
      });
      console.log("Rooms: ", rooms);

      const room_options = rooms.map((room) => {
        return [room.id, room.name];
      });
      room_options.unshift([0, "Select A Room"]);
      setRoomSelection(room_options);
      setSlotForm({ ...slotForm, [name]: value });
    }
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleCreateSlotSubmit(e)}
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
        <Form.Select onChange={handleGetRooms} name="building">
          <option value={[0, "Select a building"]}>Select a building</option>
          {user.id
            ? user.school.locations.map((location) => {
                return (
                  <option
                    key={location.building.id}
                    value={[location.building.id, location.building.name]}
                  >
                    {location.building.name}
                  </option>
                );
              })
            : null}
        </Form.Select>
        <Form.Select onChange={handleSlotFormOnChange} name="room">
          {roomSelection ? (
            roomSelection.map((room) => {
              return (
                <option key={room[0]} value={[room[0], room[1]]}>
                  {room[1]}
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
        />
        <Form.Control
          type="number"
          onChange={handleSlotFormOnChange}
          name="tutee_capacity"
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

export default CreateTutoringTimeSlots;
