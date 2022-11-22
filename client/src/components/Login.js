import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login({ closeForm}) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState([]);
  const auth = useAuth();

  function renderErrors() {
    const error_text = errors.map((error, index) => {
      return (
        <li key={index}>
          {error[0]}
          <ul>
            <li>{error[1]}</li>
          </ul>
        </li>
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

  function handleSignUpSubmit(e) {
    e.preventDefault();
    auth.login(loginForm)
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
        <Form.Text className="text-danger">
          <ul>{renderErrors()}</ul>
        </Form.Text>
      </Form>
    </div>
  );
}

export default Login;
