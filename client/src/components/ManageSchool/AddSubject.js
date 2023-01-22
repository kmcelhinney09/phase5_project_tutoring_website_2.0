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

  function renderErrors(errors) {
    console.log(errors);
    const error_text = errors.map((error, index) => {
      return (
        <ul key={index}>
          <li>
            {error[0]}
            <ul>
              <li>{error[1]}</li>
            </ul>
          </li>
        </ul>
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
    //[x]: link add subject to school store
    dispatch(addSchoolSubject(subjectForm));
    console.log(!school.renderErrorMessage);
    if (school.renderErrorMessage) {
      closeForm();
    }
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
        {school.errorText.length > 0 && (
          <Form.Text className="text-danger">
            {renderErrors(school.errorText)}
          </Form.Text>
        )}
      </Form>
    </div>
  );
}

export default AddSubject;
