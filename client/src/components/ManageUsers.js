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
          setSchoolData(data);
        });
      }
    });
  }, [user.school.id]);
//TODO: Make Edit Button Funcational
//TODO: Make Delete Button Functional
//TODO: Make Password Reset Button Functional
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
            <tr key={school_user.id}>
              <td>{school_user.full_name}</td>
              <td>{school_user.email}</td>
              <td>
                <Button variant="success">Edit</Button>{" "}
                <Button variant="success">Delete</Button>{" "}
                <Button variant="success">Reset Password</Button>
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
