import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import { addNewNote, clearError } from "../ManageUsers/userSlice";

//Note: created action to add note to store
function LeaveNote({ closeForm, tuteeData }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const errorText = useSelector((store) => store.user.errorText);
  const renderErrorMessage = useSelector(
    (store) => store.user.renderErrorMessage
  );

  const [noteForm, setNoteForm] = useState({
    tutor_id: user.id,
    tutee_id: tuteeData.tuteeId,
    note: "",
  });

  function renderErrors(errors) {
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

  function handleNoteOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNoteForm({ ...noteForm, [name]: value });
  }

  function handleNoteOnSubmit(e) {
    e.preventDefault();
    //[x]: include note in written notes section
    dispatch(addNewNote(noteForm));
    if (!renderErrorMessage) {
      dispatch(clearError());
      closeForm();
    }
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
        {errorText.length > 0 && (
          <Form.Text className="text-danger">
            {renderErrors(errorText)}
          </Form.Text>
        )}
      </Form>
    </div>
  );
}

export default LeaveNote;
