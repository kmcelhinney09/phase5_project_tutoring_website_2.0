import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddSubject({ closeForm }) {
  const auth = useAuth();
  const user = auth.currentUser
  const [subjectForm, setSubjectForm] = useState({
    name: "",
    school_id: user.school.id,
  });
  const [errors, setErrors] = useState([]);

  function renderErrors() {
    
    const error_text = errors.map((error, index) => {
      return (
        <li key={index}>
          {error[0]}
          <ul>
            {error[1].map((text) => (
              <li>{text}</li>
            ))}
          </ul>
        </li>
      );
    });
    return error_text;
  }

  function handleChangeSubjectForm(e) {
    let name = e.target.name
    let value = e.target.value
    setSubjectForm({...subjectForm, [name]:value})
  }

  function handleSubmiitSubjectForm(e) {
    e.preventDefault();
    setErrors([]);

    let newUser = JSON.parse(JSON.stringify(user));
    let updatedSubject = newUser.school.subjects
    updatedSubject.push(subjectForm)
    auth.updateCurrentUser(newUser)

    closeForm();

    fetch("/subject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subjectForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((subject) => {
          
        });
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));
      }
    });
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form className="rounded p-3 p-sm-4" onSubmit={handleSubmiitSubjectForm}>
        <Form.Control
          type="text"
          placeholder="Subject Name"
          value={subjectForm.name}
          onChange={handleChangeSubjectForm}
          name="name"
        />
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="primary" onClick={closeForm}>
          Cancel
        </Button>
        <br />
        <Form.Text className="text-danger">
          <ul>{renderErrors()}</ul>
        </Form.Text>
      </Form>
    </div>
  );
}

export default AddSubject;
