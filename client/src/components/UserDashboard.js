import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/esm/Nav";
import UserInfo from "./UserInfo";
import { LinkContainer } from "react-router-bootstrap";
import TutoringSignUp from "./TutoringSignUp";
import AdminControl from "./AdminControl";
import SessionSignUp from "./SessionSignUp";

function UserDashboard({ dashboardKey, handle_dashboard_key_change }) {
  const user = useAuth().currentUser;

  const [tutoringInfo, setTutoringInfo] = useState(false);

  useEffect(() => {
    fetch(`/schools/${user.school.id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setTutoringInfo(data);
        });
      }
    });
  }, [user.school.id]);

  return (
    <>
      {user.role ? (
        <div className="mb-5">
          <Tab.Container
            id="left-tabs-example"
            activeKey={dashboardKey}
            onSelect={(k) => handle_dashboard_key_change(k)}
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {user.role === "admin" ? (
                    <Nav.Item>
                      <LinkContainer to={`/admin/${user.id}`}>
                        <Nav.Link eventKey="adminControl">
                          Admin Control
                        </Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                  ) : (
                    <Nav.Item>
                      <LinkContainer to={`/user/${user.id}`}>
                        <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                  )}
                  <Nav.Item>
                    <LinkContainer to="/user/tutoring">
                      <Nav.Link eventKey="tutoring">Tutoring Sign-up</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  {user.role === "tutor" || user.role === "admin" ? (
                    <Nav.Item>
                      <LinkContainer to="/user/session_signup">
                        <Nav.Link eventKey="sessionSignup">
                          Session Signup
                        </Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                  ) : null}
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="adminControl">
                    <AdminControl />
                  </Tab.Pane>
                  <Tab.Pane eventKey="dashboard">
                    <UserInfo />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tutoring">
                    <TutoringSignUp tutoringInfo={tutoringInfo}
                    callingComponent={'TutoringSignUp'}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="sessionSignup">
                    <SessionSignUp tutoringInfo={tutoringInfo} callingComponent={'SessionSignUp'}/>
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
