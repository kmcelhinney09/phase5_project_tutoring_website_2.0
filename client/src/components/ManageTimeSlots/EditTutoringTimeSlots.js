import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import TimeSlotForm from "./TimeSlotForm";
import { updateTutoringTimeSlot } from "../ManageSchool/schoolSlice";

function EditTutoringTimeSlots({ closeForm, index, slotInfo }) {
  const { user, school } = useSelector((store) => store);
  console.log("Slot info comming into edit: ", slotInfo);
  const dispatch = useDispatch();
  const locations = school.locations;
  const [slotForm, setSlotForm] = useState({
    id: slotInfo.id,
    date: format(new Date(slotInfo.date_sort), "yyyy-MM-dd"),
    start_time: format(
      new Date(slotInfo.date_sort),
      "HH:mm"
    ),
    // start_time: slotInfo.start_time.substring(0, slotInfo.start_time.length - 3),
    end_time: format(
      new Date(`${slotInfo.date} ${slotInfo.end_time}`),
      "HH:mm"
    ),
    room: getBuilding()[0],
    building: getBuilding()[1],
    tutor_capacity: slotInfo.tutor_capacity,
    tutee_capacity: slotInfo.tutee_capacity,
    room_id: slotInfo.room_id,
  });
  console.log(format(new Date(slotInfo.date_sort), "yyyy-MM-dd"));
  
  console.log(slotInfo.date);
  const [errors, setErrors] = useState([]); //[]: link to errors in school store

  //TODO: Is this still necessary with the store?
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
    setErrors([]); //[]: link to clear errors in school store
    //[]: link to edit tutoring time slot in school store
    dispatch(updateTutoringTimeSlot(slotForm));
    // let new_user = JSON.parse(JSON.stringify(user));
    // let updated_time_slots = new_user.school.tutoring_time_slots;
    // let room_id;

    // const start_time = `${slotForm.date} ${slotForm.start_time}`;
    // const end_time = `${slotForm.date} ${slotForm.end_time}`;

    // new_user.school.locations.forEach((location) => {
    //   location.rooms.forEach((room) => {
    //     if (room.name === slotForm.room) {
    //       room_id = room.id;
    //     }
    //   });
    // });

    // const edited_time_slot = {
    //   tutor_capacity: slotForm.tutor_capacity,
    //   tutee_capacity: slotForm.tutee_capacity,
    //   start_time: start_time,
    //   end_time: end_time,
    //   room_id: room_id,
    // };
    // updated_time_slots.forEach((slot) => {
    //   if (slot.id === slotInfo.id) {
    //     slot.tutee_capacity = edited_time_slot.tutee_capacity;
    //     slot.tutor_capacity = edited_time_slot.tutor_capacity;
    //     slot.start_time = edited_time_slot.start_time;
    //     slot.end_time = edited_time_slot.end_time;
    //     slot.room_id = edited_time_slot.room_id;
    //   }
    // });
    // auth.updateCurrentUser(new_user);
    closeForm();
  }

  return (
    <TimeSlotForm
      slotForm={slotForm}
      setSlotForm={setSlotForm}
      handleSlotSubmit={handleEditSlotSubmit}
      closeForm={closeForm}
      errors={errors}
    />
  );
}

export default EditTutoringTimeSlots;
