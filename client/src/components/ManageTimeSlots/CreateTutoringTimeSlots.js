import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTutoringTimeSlot } from "../ManageSchool/schoolSlice";
import TimeSlotForm from "./TimeSlotForm";

function CreateTutoringTimeSlots({ closeForm }) {
  const user = useSelector((store) => store.user);
  const renderErrorMessage = useSelector(
    (store) => store.school.renderErrorMessage
  );
  const dispatch = useDispatch();
  const [slotForm, setSlotForm] = useState({
    userId: user.id,
    date: "",
    start_time: "",
    end_time: "",
    room: "",
    building: "",
    tutor_capacity: 0,
    tutee_capacity: 0,
  });

  function handleCreateSlotSubmit(e) {
    e.preventDefault();
    //[x] link to add a new tutoring timeslot to the school store
    dispatch(createTutoringTimeSlot(slotForm));
    if (renderErrorMessage) {
      closeForm();
    }
  }

  return (
    <TimeSlotForm
      slotForm={slotForm}
      setSlotForm={setSlotForm}
      handleSlotSubmit={handleCreateSlotSubmit}
      closeForm={closeForm}
    />
  );
}

export default CreateTutoringTimeSlots;
