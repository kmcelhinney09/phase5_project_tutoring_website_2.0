import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

function ManageUsers() {
  const user = useAuth().currentUser;
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    fetch(`/schools/${user.school.id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("School Users: ", data);
          setSchoolData(data);
        });
      }
    });
  }, [user.school.id]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {schoolData.length !== 0?(
          schoolData.map((school_user) => {
            return(
            <tr>
              <td>{school_user.full_name}</td>
              <td>{school_user.email}</td>
              <td>
                <Button>Edit</Button>{" "}
                <Button>Delete</Button>
              </td>
            </tr>
            )
          })
        ):(
          <tr>
            <td>
              Loading....
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default ManageUsers;
