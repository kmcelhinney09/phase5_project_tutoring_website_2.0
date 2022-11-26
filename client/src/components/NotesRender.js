import { useAuth } from "../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";

function NotesRender() {
  const user = useAuth().currentUser;
  
  return (
    <Container>
      <h4>Notes:</h4>
      <Row xs={1} md={2} className="g-4">
        {user.tutor_notes.length !== 0? (user.tutor_notes.map((note) => {
          return (
            <Col key={note.id}>
              <Card border="success">
                <Card.Body>
                  <Card.Title>{note.tutor_name} says:</Card.Title>
                  <Card.Text>{note.tutor_note}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })): <h5>No Notes</h5>}
      </Row>
    </Container>
  );
}

export default NotesRender;
