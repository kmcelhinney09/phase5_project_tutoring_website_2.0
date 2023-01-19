import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTutoringTimeSlot } from "../ManageSchool/schoolSlice";
import TimeSlotForm from "./TimeSlotForm";

function CreateTutoringTimeSlots({ closeForm }) {
  const { user, school } = useSelector((store) => store);
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
  const [errors, setErrors] = useState([]); //[]: link to errors in school store

  function handleCreateSlotSubmit(e) {
    e.preventDefault();
    setErrors([]); //[]: link to clear errors in school store
    //[x] link to add a new tutoring timeslot to the school store

    dispatch(createTutoringTimeSlot(slotForm));

    closeForm();
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
