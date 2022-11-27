import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function ManageUsers() {
  const user = useAuth().currentUser;
  const [schoolUsers, setSchoolUsers] = useState(false);

  useEffect(() => {
    fetch(`/schools/${user.school.id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("School Users: ", data);
          setSchoolUsers(data);
        });
      }
    });
  }, [user.school.id]);

  return <div>ManageUsers</div>;
}

export default ManageUsers;
