import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import TimeSlotForm from "./TimeSlotForm";

function EditTutoringTimeSlots({ closeForm, index, slotInfo }) {
  const auth = useAuth();
  const user = auth.currentUser;
  const locations = user.school.locations;
  console.log("User: ", user);
  const [slotForm, setSlotForm] = useState({
    date: "",
    start_time: "",
    end_time: "",
    room: "",
    building: "",
    tutor_capacity: 0,
    tutee_capacity: 0,
  });

  console.log("Slot Info", slotInfo);

  useEffect(() => {
    let settingSlot = {
      date: slotInfo.start_time.slice(0,10),
      start_time: slotInfo.start_time.slice(11, 19),
      end_time: slotInfo.end_time.slice(11, 19),
      room: getBuilding()[0],
      building: getBuilding()[1],
      tutor_capacity: slotInfo.tutor_capacity,
      tutee_capacity: slotInfo.tutee_capacity,
    };
    setSlotForm(settingSlot);
  }, [slotInfo]);

  function getBuilding() {
    let building;
    let room;
    if (slotInfo.room_id > 0) {
      locations.forEach((location) => {
        location.rooms.forEach((roomInfo) => {
          if (slotInfo.room_id === roomInfo.id) {
            room = roomInfo.name;
            building = location.building.name;
          }
        });
      });
      return [room, building];
    }
  }

  function handleEditSlotSubmit(e) {
    e.preventDefault();
    let new_user = JSON.parse(JSON.stringify(user));
    let updated_time_slots = new_user.school.tutoring_time_slots;
    let room_id;
    console.log("Slot Form INFO: ", slotForm);

    const start_time = `${slotForm.date} ${slotForm.start_time}`;
    const end_time = `${slotForm.date} ${slotForm.end_time}`;

    new_user.school.locations.forEach((location) => {
      console.log("Locaiton: ", location.building.name);
      location.rooms.forEach((room) => {
        if (room.name === slotForm.room) {
          room_id = room.id;
        }
      });
    });

    const edited_time_slot = {
      tutor_capacity: slotForm.tutor_capacity,
      tutee_capacity: slotForm.tutee_capacity,
      start_time: start_time,
      end_time: end_time,
      room_id: room_id,
    };
    console.log("Edited Time Slot: ", edited_time_slot);
    updated_time_slots.forEach((slot) => {
      if (slot.id == slotInfo.id) {
        slot.tutee_capacity = edited_time_slot.tutee_capacity;
        slot.tutor_capacity = edited_time_slot.tutor_capacity;
        slot.start_time = edited_time_slot.start_time;
        slot.end_time = edited_time_slot.end_time;
        slot.room_id = edited_time_slot.room_id;
      }
    });
    console.log("New User Info: ", new_user);
    auth.updateCurrentUser(new_user);
    closeForm();

    fetch(`/tutoring_time_slots/${slotInfo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edited_time_slot),
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

  return (
    <TimeSlotForm
      slotForm={slotForm}
      setSlotForm={setSlotForm}
      handleSlotSubmit={handleEditSlotSubmit}
      closeForm={closeForm}
    />
  );
}

export default EditTutoringTimeSlots;
