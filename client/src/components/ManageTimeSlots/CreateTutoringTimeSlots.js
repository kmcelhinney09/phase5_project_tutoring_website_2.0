import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import TimeSlotForm from "./TimeSlotForm";

function CreateTutoringTimeSlots({ closeForm }) {
  const auth = useAuth();
  const user = auth.currentUser;
  const [slotForm, setSlotForm] = useState({
    date: "",
    start_time: "",
    end_time: "",
    room: "",
    building: "",
    tutor_capacity: 0,
    tutee_capacity: 0,
  });
  const [errors, setErrors] = useState([]);

  function handleCreateSlotSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let new_user = JSON.parse(JSON.stringify(user));
    let start_time = `${slotForm.date} ${slotForm.start_time}`;
    let end_time = `${slotForm.date} ${slotForm.end_time}`;
    let room_id;

    new_user.school.locations.forEach((location) => {
      location.rooms.forEach((room) => {
        if (room.name === slotForm.room) {
          room_id = room.id;
        }
      });
    });

    const new_time_slot = {
      created_by: user.id,
      tutor_capacity: slotForm.tutor_capacity,
      tutee_capacity: slotForm.tutee_capacity,
      start_time: start_time,
      end_time: end_time,
      open_status: false,
      booked_status: false,
      school_id: user.school.id,
      room_id: room_id,
    };
    new_user.school.tutoring_time_slots.push(new_time_slot);
    auth.updateCurrentUser(new_user);
    closeForm();

    fetch("/tutoring_time_slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_time_slot),
    }).then((res) => {
      if (res.ok) {
        res.json().then((slot) => {
          auth.auto();
        });
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));
      }
    });
  }

  return (
    <TimeSlotForm
      slotForm={slotForm}
      setSlotForm={setSlotForm}
      handleSlotSubmit={handleCreateSlotSubmit}
      closeForm={closeForm}
      errors={errors}
    />
  );
}

export default CreateTutoringTimeSlots;
