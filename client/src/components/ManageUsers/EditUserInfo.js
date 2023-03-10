import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function EditUserInfo({
  closeForm,
  userInfo,
  schoolData,
  setSchoolData,
  userIndex,
}) {
  const [userInfoForm, setUserInfoForm] = useState({
    id: userInfo.id,
    full_name: userInfo.full_name,
    email: userInfo.email,
    role: userInfo.role,
    grade: userInfo.grade,
  });

  const [errors, setErrors] = useState([]);
  const [subjectsTutored, setSubjectsTutored] = useState(
    userInfo.subjects_signed_up
  );

  function renderErrors() {
    console.log(errors);
    const error_text = errors.map((error, index) => {
      return <li key={index}>{error}</li>;
    });
    return (
      <>
        <p>Try and refesh</p>
        {error_text}
      </>
    );
  }

  function handleUserInfoOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfoForm({ ...userInfoForm, [name]: value });
  }

  function handleUserInfoOnSubmit(e) {
    e.preventDefault();
    setErrors([]);
    //[x]: link to edit user action in user store (This is contained to just edit/mangae user no need for store)
    let new_data = JSON.parse(JSON.stringify(schoolData));
    new_data[userIndex] = userInfoForm;
    setSchoolData(new_data);

    fetch(`/users/${userInfo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfoForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => closeForm());
      } else {
        res.json().then((e) => {
          if (typeof e.error === "string") {
            setErrors([e.exception, [e.error]]);
          } else {
            setErrors(Object.entries(e.error));
          }
        });
      }
    });
  }

  function handleSubjectsTutoredEdit(e) {
    let value = e.target.value;
    //[x]: link to edit tutored subjects in user screen (This is contained to just edit/mangae user no need for store)
    value = value.split(",");
    const newSubjectsList = subjectsTutored.splice(value[0], 1);
    setSubjectsTutored(newSubjectsList);

    fetch(`/tutored_subject/${value[1]}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {});
      } else {
        res.json().then((e) => {
          if (typeof e.error === "string") {
            setErrors([e.exception, [e.error]]);
          } else {
            setErrors(Object.entries(e.error));
          }
        });
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
        <FloatingLabel
          controlId="floatingInput"
          label="Subjects Tutored"
          className="mb-3"
        >
          <Form.Select onChange={handleSubjectsTutoredEdit}>
            <option>(click to remove)</option>
            {userInfo.subjects_signed_up.map((sub, index) => {
              return (
                <option key={sub.id} value={[index, sub.id]}>
                  {sub.name}
                </option>
              );
            })}
          </Form.Select>
        </FloatingLabel>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="primary" onClick={closeForm}>
          Close
        </Button>
        <br />
        {errors.length > 0 ? (
          <Form.Text className="text-danger">
            <ul>{renderErrors()}</ul>
          </Form.Text>
        ) : null}
      </Form>
    </div>
  );
}

export default EditUserInfo;
