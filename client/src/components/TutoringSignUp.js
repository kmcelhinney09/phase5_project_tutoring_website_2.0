import { useAuth } from "../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function TutoringSignUp() {
  const user = useAuth().currentUser;
  console.log("Tutoring User:", user);
  return (
    <>
      {user.id ? (
        <Container>
          <h1>Cow</h1>
        </Container>
      ) : (
        <h1> Loading....</h1>
      )}
    </>
  );
}

export default TutoringSignUp;
