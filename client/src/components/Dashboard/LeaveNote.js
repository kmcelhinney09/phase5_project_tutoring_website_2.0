import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import { addTutorNote } from "../ManageUsers/userSlice";
//[]: Fix Error Handeling to work with store
//Note: created action to add note to store
function LeaveNote({ closeForm, tuteeData }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [noteForm, setNoteForm] = useState({
    tutor_id: user.id,
    tutee_id: tuteeData.tuteeId,
    note: "",
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

  function handleNoteOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNoteForm({ ...noteForm, [name]: value });
  }

  function handleNoteOnSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let newNote = {
      tutor_id: user.id,
      tutor_name: user.fullName,
      tutor_note: noteForm.note,
      tutee_name: tuteeData.tuteeName,
    };
    dispatch(addTutorNote(newNote));
    closeForm();

    fetch("/tutor_note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteForm),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        //[]: create message that action was sucessful
        res.json().then((return_note) => {}); //[]: include note in written notes section
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));
      }
    });
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-13 p-sm-4"
        onSubmit={(e) => handleNoteOnSubmit(e)}
      >
        <FloatingLabel
          controlId="floatingInput"
          label="Leave a note for the student"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            size="lg"
            rows={5}
            cols={100}
            placeholder="Leave a Note"
            value={noteForm.note}
            onChange={handleNoteOnChange}
            name="note"
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="primary" onClick={closeForm}>
          Close
        </Button>
        <br />
        <Form.Text className="text-danger">
          <ul>{renderErrors()}</ul>
        </Form.Text>
      </Form>
    </div>
  );
}

export default LeaveNote;
