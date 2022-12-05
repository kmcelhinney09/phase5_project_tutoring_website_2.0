import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

function ManageUsers() {
  const user = useAuth().currentUser;
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    fetch("/users").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setSchoolData(data);
        });
      } else {
        res.json().then((e) => console.log(Object.entries(e.error)));
      }
    });
  }, [user.school.id]);


  function handleDeleteUser(userId, userIndex){
    let newSchoolData = JSON.parse(JSON.stringify(schoolData));
    newSchoolData.splice(userIndex,1)
    setSchoolData(newSchoolData)
    
    fetch(`/users/${userId}`, {
      method: "DELETE",
    })
  }
  //TODO: Make Edit Button Funcational
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
        {schoolData.length !== 0 ? (
          schoolData.map((schoolUser,index) => {
            return (
              <tr key={schoolUser.id}>
                <td>{schoolUser.full_name}</td>
                <td>{schoolUser.email}</td>
                <td>
                  <Button variant="success">Edit</Button>{" "}
                  <Button variant="success" onClick={() => handleDeleteUser(schoolUser.id, index)}>Delete</Button>{" "}
                  <Button variant="success">Reset Password</Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>Loading....</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default ManageUsers;
