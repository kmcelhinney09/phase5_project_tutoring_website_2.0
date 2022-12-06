import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function TutoringSlotRender({ slotInfo, handleDashboardKeyChange }) {
  const auth = useAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  let slot_status;
  
  function handle_book_tutoring(tutorId, tutorName, tutorSubjects) {
    let signUpSlot
    let newUser = JSON.parse(JSON.stringify(user));
    let updatedBookedSlots = newUser.booked_slots;
    slotInfo.tutor_slot_sign_ups.forEach((signUp) => {
      if (signUp.tutor_id === tutorId){
        signUpSlot = signUp.id
      }
    })
    let newBooking = {
      date: slotInfo.date,
      date_sort: slotInfo.date_sort,
      end_time: slotInfo.end_time,
      location: slotInfo.location_render,
      start_time: slotInfo.start_time,
      tutee: { id: user.id, full_name: user.full_name },
      tutor: {
        id: tutorId,
        full_name: tutorName,
        subjects_covered: tutorSubjects,
      },
    };
    updatedBookedSlots.push(newBooking);
    console.log(updatedBookedSlots);
    auth.updateCurrentUser(newUser);

    fetch("/booked_slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tutor_id: tutorId,
        tutee_id: user.id,
        tutoring_time_slot_id: slotInfo.id,
        tutor_slot_sign_up_id: signUpSlot,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((bookedSlot) => {
          console.log(bookedSlot);
          handleDashboardKeyChange("dashboard")
          navigate(`/user/${user.id}`, { replace: true });
        });
      } else {
        // res.json().then((e) => setErrors(Object.entries(e.error)));
        res.json().then((e) => console.log(Object.entries(e.error)));
      }
    });
  }

  return (
    <>
      {slotInfo.tutors.length !== 0 ? (
        slotInfo.tutors.map((tutor) => {
          if (slotInfo.booked_status === false) {
            slot_status = (
              <td>
                <Button
                  onClick={() =>
                    handle_book_tutoring(
                      tutor.id,
                      tutor.full_name,
                      tutor.subjects_covered
                    )
                  }
                >
                  Sign-up
                </Button>
              </td>
            );
          } else {
            slot_status = <td className="text-danger">Full</td>;
          }

          return (
            <tr key={slotInfo.id + tutor.full_name + slotInfo.room_id}>
              <td className="text-center">{slotInfo.date}</td>
              <td className="text-center">{tutor.full_name}</td>
              <td className="text-center">{tutor.subjects_covered}</td>
              <td className="text-center">{slotInfo.start_time}</td>
              <td className="text-center">{slotInfo.end_time}</td>
              <td className="text-center">{slotInfo.tutee_space}</td>
              {slot_status}
            </tr>
          );
        })
      ) : (
        <tr>
          <td className="text-center">{slotInfo.date}</td>
          <td className="text-center">None Signed up</td>
          <td className="text-center"></td>
          <td className="text-center">{slotInfo.start_time}</td>
          <td className="text-center">{slotInfo.end_time}</td>
          <td className="text-center">{slotInfo.tutee_space}</td>
          <td>
            <Button>Sign up</Button>
          </td>
        </tr>
      )}
    </>
  );
}

export default TutoringSlotRender;
