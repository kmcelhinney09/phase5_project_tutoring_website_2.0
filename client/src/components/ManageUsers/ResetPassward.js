import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";

function ResetPassward({ closeForm, userId }) {
  
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    password_confirmation: "",
    confirm_reset: false,
  });
  const [passwordResetMessage, setPasswordResetMessage] = useState("");

  function handleClose(){
    setPasswordResetMessage("")
    closeForm();
  }

  function handleResetPasswordOnChange(e) {
    const value = e.target.value
    const name = e.target.name
    const checked = e.target.checked
    
    if (name == "confirm_reset"){
      setPasswordForm({...passwordForm, [name]:checked})
    }else{
      setPasswordForm({...passwordForm, [name]:value})
    }
  }

  function handleResetPasswordSubmit(e) {
    e.preventDefault();
    if (passwordForm.confirm_reset){
      let restPassword = {
        password:passwordForm.password, 
        password_confirmation: passwordForm.password_confirmation
      }

      fetch(`/admin/password_reset/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restPassword),
      }).then((res) => {
        if (res.ok) {
            setPasswordResetMessage("Password was successfully reset")
        } else {
          // res.json().then((e) => setErrors(Object.entries(e.error)));
          res.json().then((e) => console.log(Object.entries(e.error)));
        }
      });
    }else{
      setPasswordResetMessage("You must check confirm password box")
    }
    
    
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-3 p-sm-4"
        onSubmit={(e) => handleResetPasswordSubmit(e)}
      >
        <Form.Label>{passwordResetMessage}</Form.Label>
        <Form.Control
          type="password"
          placeholder="New Password"
          value={passwordForm.password}
          onChange={handleResetPasswordOnChange}
          name="password"
        />
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={passwordForm.password_confirmation}
          onChange={handleResetPasswordOnChange}
          name="password_confirmation"
        />
        <FormGroup>
          <Form.Label className="text-danger">Check here to confirm password reset</Form.Label>
        <Form.Check
          type='checkbox'
          name="confirm_reset"
          label='Yes, reset password'
          onChange={handleResetPasswordOnChange}
        />
        </FormGroup>
        
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="primary" onClick={handleClose}>
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

export default ResetPassward;
