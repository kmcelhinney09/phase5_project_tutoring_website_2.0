import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";

function LeaveNote({ closeForm, tuteeId }) {
  const auth = useAuth();
  const user = auth.currentUser
  const [noteForm, setNoteForm] = useState({
    tutor_id:user.id,
    tutee_id:tuteeId,
    note:""
  });

  function handleNoteOnChange(e) {
    const name = e.target.name
    const value = e.target.value
    console.log("Name: ",name,"Value: ", value)
    setNoteForm({...noteForm, [name]:value})
  }

  function handleNoteOnSubmit(e) {
    e.preventDefault();
    let new_user = JSON.parse(JSON.stringify(user));
    let new_written_notes = new_user.written_notes
    let new_note = {tutor_name:user.full_name, tutor_note:noteForm.note}
    new_written_notes.push(new_note)
    auth.updateCurrentUser(new_user)
    closeForm();

    fetch("/tutor_note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((return_note) => {
          console.log(return_note)
          auth.auto();
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
          <ul></ul>
        </Form.Text>
      </Form>
    </div>
  );
}

export default LeaveNote;
