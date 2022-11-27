import { useAuth } from "../context/AuthProvider";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/esm/Nav";
import ManageSchool from "./ManageSchool";
import ManageTimeSlots from "./ManageTimeSlots";

function AdminControl() {
  const user = useAuth().currentUser;
  console.log(user.id);
  return (
    <>
      {user.id ? (
        <>
          <h1>{user.school.name}</h1>
            <div className="mb-5">
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey={"schoolResources"}
              >
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="schoolResources">
                          Manage Buildings and Rooms
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="timeSlots">
                          Manage Tutoring Time Slots
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="manageUsers">
                          Manage Users
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={8}>
                    <Tab.Content>
                      <Tab.Pane eventKey="schoolResources">
                        <ManageSchool />
                      </Tab.Pane>
                      <Tab.Pane eventKey="timeSlots">
                        <ManageSchool />
                      </Tab.Pane>
                      <Tab.Pane eventKey="manageUsers">
                        <ManageSchool />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
        </>
      ) : (
        <h1>Loading.....</h1>
      )}
    </>
  );
}

export default AdminControl;
