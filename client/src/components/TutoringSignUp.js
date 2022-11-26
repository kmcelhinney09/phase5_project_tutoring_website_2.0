import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function TutoringSignUp() {
  const user = useAuth().currentUser;
  const [tutoringInfo,setTutoringInfo] = useState(false)

  useEffect(() => {
    fetch(`/school/${user.school.id}/tutoring`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setTutoringInfo(data);
        });
      }
    });
  }, [user.school.id]);
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
