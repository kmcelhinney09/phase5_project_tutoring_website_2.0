import { useState } from "react";
import { useAuth } from "../../context/AuthProvider"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function EditUserInfo({closeForm, userInfo, schoolData, setSchoolData, userIndex}) {
const [userInfoForm, setUserInfoForm] = useState({
  id:userInfo.id,
  full_name:userInfo.full_name,
  email:userInfo.email,
  role:userInfo.role,
  grade:userInfo.grade
});
console.log(userInfo)

  function handleUserInfoOnChange(e){
    const name = e.target.name
    const value = e.target.value
    setUserInfoForm({...userInfoForm, [name]:value})
  }

  function handleUserInfoOnSubmit(e){
    e.preventDefault();
    let new_data= JSON.parse(JSON.stringify(schoolData));
    new_data[userIndex] = userInfoForm
    setSchoolData(new_data)

    closeForm();

    fetch(`/users/${userInfo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfoForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log(user)
        });
      } else {
        // res.json().then((e) => setErrors(Object.entries(e.error)));
        res.json().then((e) => console.log(Object.entries(e.error)));
      }
    });
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleUserInfoOnSubmit(e)}
      >
        <FloatingLabel
        controlId="floatingInput"
        label="User's full name"
        className="mb-3"
        >
        <Form.Control
          type="text"
          placeholder="Full Name"
          value={userInfoForm.full_name}
          onChange={handleUserInfoOnChange}
          name="full_name"
        />
        </FloatingLabel>

        <FloatingLabel
        controlId="floatingInput"
        label="User's email address"
        className="mb-3"
        >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={userInfoForm.email}
          onChange={handleUserInfoOnChange}
          name="email"
        />
        </FloatingLabel>
        
        <FloatingLabel
        controlId="floatingInput"
        label="User's Role"
        className="mb-3"
        >
        <Form.Control
          type="text"
          placeholder="Role"
          value={userInfoForm.role}
          onChange={handleUserInfoOnChange}
          name="role"
        />
        </FloatingLabel>
        
        <FloatingLabel
        controlId="floatingInput"
        label="User's Grade Level"
        className="mb-3"
        >
        <Form.Control
          type="text"
          placeholder="Grade Level"
          value={userInfoForm.grade}
          onChange={handleUserInfoOnChange}
          name="grade"
        />
        </FloatingLabel>

        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="primary" onClick={closeForm}>
          Close
        </Button>
        <br />
        <Form.Text className="text-danger">
          <ul></ul>
        </Form.Text>
      </Form>
    </div>
  )
}

export default EditUserInfo