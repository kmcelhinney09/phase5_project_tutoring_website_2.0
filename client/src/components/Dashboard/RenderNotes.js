import React from 'react'
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/esm/Button';

function RenderNotes({ notesData, userRole, handleDelete="" }) {
   return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {notesData.length !== 0? (notesData.map((note,index) => {
          return (
            <Col key={note.id}>
              <Card border="success">
                <Card.Body>
                  <Card.Title>{note.tutor_name} says:</Card.Title>
                  <Card.Text>{note.tutor_note}</Card.Text>
                </Card.Body>
                {userRole ==='tutor' || userRole ==="admin"?(
                  <Card.Footer>
                  <Button onClick={() => handleDelete(note.id, index)}>Delete</Button>
                </Card.Footer>
                ):null}
              </Card>
            </Col>
          );
        })): <h5>No Notes</h5>}
      </Row>
    </Container>
  );
}

export default RenderNotes