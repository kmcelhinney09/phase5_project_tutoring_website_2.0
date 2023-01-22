import { useState } from "react";
// import { useAuth } from "../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, clearError } from "./ManageUsers/userSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login({ closeForm }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { errorText, renderErrorMessage } = useSelector((store) => store.user);
  const dispatch = useDispatch();

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

  function handleFormOnChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  }

  function handleSignUpSubmitStore(e) {
    e.preventDefault();
    dispatch(getUserInfo(loginForm));
    if (!renderErrorMessage) {
      dispatch(clearError());
      closeForm();
    }
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleSignUpSubmitStore(e)}
      >
        <Form.Control
          type="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={handleFormOnChange}
          name="email"
        />
        <Form.Control
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={handleFormOnChange}
          name="password"
        />
        <br />
        <Button variant="primary" type="submit">
          Login
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

export default Login;
