import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/esm/Nav";
import UserInfo from "./UserInfo";
import TutoringSignUp from "./TutoringSignUp";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function UserDashboard() {
  const user = useAuth().currentUser;
  const { id } = useParams();
  const [key, setKey] = useState("dashboard");

  useEffect(() => {
    if (!isNaN(id)) {
      setKey("dashboard");
    } else {
      setKey(id);
    }
  }, []);

  return (
    <>
      {user.role ? (
        <div>
          {console.log(id)}
          <Tab.Container
            id="left-tabs-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <LinkContainer to={`/user/${user.id}`}>
                      <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="/user/tutoring">
                      <Nav.Link to="/user/tutoring" eventKey="tutoring">
                        Tutoring Sign-up
                      </Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  {user.role === "tutor" ? (
                    <Nav.Item>
                      <Nav.Link eventKey="sessionSignup">
                        Session Signup
                      </Nav.Link>
                    </Nav.Item>
                  ) : null}
                  {user.role === "admin" ? (
                    <Nav.Item>
                      <Nav.Link eventKey="adminControl">Admin Control</Nav.Link>
                    </Nav.Item>
                  ) : null}
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="dashboard">
                    <UserInfo />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tutoring">
                    <TutoringSignUp />
                  </Tab.Pane>
                  <Tab.Pane eventKey="sessionSignup">
                    <UserInfo />
                  </Tab.Pane>
                  <Tab.Pane eventKey="adminControl">
                    <UserInfo />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
    </>
  );
}

export default UserDashboard;
