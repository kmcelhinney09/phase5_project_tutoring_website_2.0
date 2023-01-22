import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function ActionMessage({ closeForm, actionMessage, bgcolor }) {
  return (
    <Alert show={true} variant={bgcolor}>
      <Alert.Heading>"Action Message"</Alert.Heading>
      <p>{actionMessage}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={closeForm} variant="outline-primary">
          Close
        </Button>
      </div>
    </Alert>
  );
}

export default ActionMessage;
