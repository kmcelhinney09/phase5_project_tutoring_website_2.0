import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signUpUser } from "./ManageUsers/userSlice";

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
    closeForm();
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
      </Form>
    </div>
  );
}

export default SignUp;
