import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { bookTutoringSlot, tutorSlotSignUp } from "../ManageUsers/userSlice";
import { v4 as uuid } from "uuid";
function TutoringSlotRender({
  slotInfo,
  handleDashboardKeyChange,
  callingComponent,
}) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let slot_status;

  function handleBookTutoring(tutorId) {
    // [x]:link booking tutoring to user slice
    console.log(slotInfo);
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
    //[x]:add tutor sign up to user store
    const slotSignUp = {
      tutor_id: user.id,
      tutoring_time_slot_id: slotInfo.id,
    };

    dispatch(tutorSlotSignUp(slotSignUp));
    handleDashboardKeyChange("dashboard");
    navigate(`/user/${user.id}`, { replace: true });
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
          return (
            <tr key={uuid()}>
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
