import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signUpUser, clearError } from "./ManageUsers/userSlice";

function SignUp({ closeForm }) {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    full_name: "",
    grade: "",
    school_id: 1,
    time_zone: "",
    password: "",
    password_confirmation: "",
  });
  const dispatch = useDispatch();
  const { errorText, renderErrorMessage } = useSelector((store) => store.user);
  function handleFormOnChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  }

  function handleSignUpSubmit(e) {
    //[x]: link to signup user in user store
    e.preventDefault();
    dispatch(signUpUser(signUpForm));
    if (!renderErrorMessage){
      dispatch(clearError())
      closeForm();
    }
  }


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

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleSignUpSubmit(e)}
      >
        <Form.Control
          type="email"
          placeholder="Email"
          value={signUpForm.email}
          onChange={handleFormOnChange}
          name="email"
        />
        <Form.Control
          type="text"
          placeholder="Full Name"
          value={signUpForm.full_name}
          onChange={handleFormOnChange}
          name="full_name"
        />
        <Form.Control
          type="text"
          placeholder="Grade"
          value={signUpForm.grade}
          onChange={handleFormOnChange}
          name="grade"
        />
        <Form.Select
          aria-label="Select Time Zone"
          name="time_zone"
          onChange={handleFormOnChange}
        >
          <option>Time Zone</option>
          <option value="Hawaii">Hawaii</option>
          <option value="Alaska">Alaska</option>
          <option value="Pacific Time (US & Canada)">Pacific Time (US)</option>
          <option value="Mountain Time (US & Canada)">
            Mountain Time (US)
          </option>
          <option value="Arizona">Arizona</option>
          <option value="Central Time (US & Canada)">Central Time (US)</option>
          <option value="Eastern Time (US & Canada)">Eastern Time (US)</option>
        </Form.Select>
        <Form.Control
          type="password"
          placeholder="Password"
          value={signUpForm.password}
          onChange={handleFormOnChange}
          name="password"
        />
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={signUpForm.password_confirmation}
          onChange={handleFormOnChange}
          name="password_confirmation"
        />
        <br />
        <Button variant="primary" type="submit">
          Sign-up
        </Button>{" "}
        <Button variant="primary" onClick={closeForm}>
          Cancel
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

export default SignUp;
