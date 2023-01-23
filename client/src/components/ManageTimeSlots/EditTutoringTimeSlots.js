import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import TimeSlotForm from "./TimeSlotForm";
import { updateTutoringTimeSlot } from "../ManageSchool/schoolSlice";

function EditTutoringTimeSlots({ closeForm, slotInfo }) {
  const school = useSelector((store) => store.school);
  const dispatch = useDispatch();
  const locations = school.locations;
  const [slotForm, setSlotForm] = useState({
    id: slotInfo.id,
    date: format(new Date(slotInfo.date_sort), "yyyy-MM-dd"),
    start_time: format(new Date(slotInfo.date_sort), "HH:mm"),
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
    //[x]: link to edit tutoring time slot in school store
    dispatch(updateTutoringTimeSlot(slotForm));
    if (school.renderErrorMessage === false) {
      closeForm();
    }
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
