import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addSchoolSubject } from "./schoolSlice";
//[x]: add useSelector to attach user
function AddSubject({ closeForm }) {
  const school = useSelector((store) => store.school);
  const dispatch = useDispatch();
  const [subjectForm, setSubjectForm] = useState({
    name: "",
    school_id: school.id,
  });
  const [errors, setErrors] = useState([]); //[]: Hook up to error rendering

  function renderErrors() {
    //[]: link to errors in user store
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
    let name = e.target.name;
    let value = e.target.value;
    setSubjectForm({ ...subjectForm, [name]: value });
  }

  function handleSubmiitSubjectForm(e) {
    e.preventDefault();
    setErrors([]);
    //[x]: link add subject to school store
    dispatch(addSchoolSubject(subjectForm))
    closeForm();
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
