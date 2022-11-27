import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewTutoringTimeSlot() {

  const [tutoringInfo, setTutoringInfo] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    fetch(`/tutoring_time_slots/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("TutoringTimeSlostData: ", data);
          setTutoringInfo(data);
        });
      }
    });
  }, []);
  return (
    <div>ViewTutoringTimeSlot</div>
  )
}

export default ViewTutoringTimeSlot