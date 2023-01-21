import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { bookTutoringSlot } from "../ManageUsers/userSlice";
function TutoringSlotRender({
  slotInfo,
  handleDashboardKeyChange,
  callingComponent,
  setErrors,
}) {
  // const auth = useAuth();
  // const user = auth.currentUser;
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let slot_status;

  function handleBookTutoring(tutorId) {
    setErrors([]);
    // [x]:link booking tutoring to user slice
    let signUpSlot;
    slotInfo.tutor_slot_sign_ups.forEach((signUp) => {
      if (signUp.tutor_id === tutorId) {
        signUpSlot = signUp.id;
      }
    });
    const bookedSlotData = {
      tutor_id: tutorId,
      tutee_id: user.id,
      tutoring_time_slot_id: slotInfo.id,
      tutor_slot_sign_up_id: signUpSlot,
    };
    dispatch(bookTutoringSlot(bookedSlotData));
    handleDashboardKeyChange("dashboard");
    navigate(`/user/${user.id}`, { replace: true });
  }

  function handleTutorSignUp() {
    setErrors([]);
    //[]:add tutor sign up to user store
    let newUser = JSON.parse(JSON.stringify(user));
    let signUps = newUser.tutor_sign_ups;
    const newSignUp = {
      date: slotInfo.date,
      date_sort: slotInfo.date_sort,
      end_time: slotInfo.end_time,
      location: slotInfo.location_render,
      start_time: slotInfo.start_time,
    };
    signUps.push(newSignUp);
  
    fetch("/tutor_slot_sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tutor_id: user.id,
        tutoring_time_slot_id: slotInfo.id,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((tutorSignUp) => {
          //[]: create message that action was successful
          handleDashboardKeyChange("dashboard");
          navigate(`/user/${user.id}`, { replace: true });
        });
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error))); //[]: link to errors in school store
      }
    });
  }

  return (
    <>
      {slotInfo.tutors.length !== 0 ? (
        slotInfo.tutors.map((tutor) => {
          if (slotInfo.booked_status === false) {
            if (callingComponent === "TutoringSignUp") {
              slot_status = (
                <td>
                  <Button
                    variant="success"
                    onClick={() =>
                      handleBookTutoring(
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
              slot_status = (
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleTutorSignUp(slotInfo)}
                  >
                    Sign-up
                  </Button>
                </td>
              );
            }
          } else {
            slot_status = <td className="text-danger">Full</td>;
          }
          {
            //[] replace ID below with uuid
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
            <Button
              variant="success"
              onClick={() => handleTutorSignUp(slotInfo)}
            >
              Sign up
            </Button>
          </td>
        </tr>
      )}
    </>
  );
}

export default TutoringSlotRender;
