import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Home from "./components/Home";
import UserDashboard from "./components/Dashboard/UserDashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import ViewTutoringTimeSlot from "./components/ManageTimeSlots/ViewTutoringTimeSlot";
//TODO: Remove this APP and change the other oone to APP
function App() {
  const auth = useAuth();
  const user = auth.currentUser;
  const [dashboardKey, setDashboardKey] = useState("dashboard");
  

  useEffect(() => {
    auth.auto();
  }, []);

  function handleLogout() {
    auth.logout();
  }

  function handleDashboardKeyChange(key) {
    setDashboardKey(key);
  }

  function handleUserView() {
    let navigation;
    if (user.role === "admin") {
      navigation = <Navigate to={`/admin/${auth.currentUser.id}`} />;
    } else {
      navigation = <Navigate to={`/user/${auth.currentUser.id}`} />;
    }
    return navigation;
  }

  return (
    <Router>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to={"/"}>
              Knowledgeable Tutoring Platform
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                {auth.isLoggedIn ? (
                  <Button variant="success" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : null}
                <Nav.Link href="">
                  {auth.isLoggedIn ? auth.currentUser.full_name : null}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              path={`/admin/:id`}
              element={
                <UserDashboard
                  dashboardKey={"adminControl"}
                  handleDashboardKeyChange={handleDashboardKeyChange}
                />
              }
            />
            <Route
              path={"/tutoring_time_slots"}
              element={
                <UserDashboard
                  dashboardKey={"tutoring"}
                  handleDashboardKeyChange={handleDashboardKeyChange}
                />
              }
            />
            <Route
              path={"/user/session_signup"}
              element={
                <UserDashboard
                  dashboardKey={"sessionSignup"}
                  handleDashboardKeyChange={handleDashboardKeyChange}
                />
              }
            />
            <Route
              path={"/user/:id"}
              element={
                <UserDashboard
                  dashboardKey={dashboardKey}
                  handleDashboardKeyChange={handleDashboardKeyChange}
                />
              }
            />
            <Route
              path={"/tutoring_time_slots/:id"}
              element={<ViewTutoringTimeSlot />}
            />
          </Route>
          <Route
            path="/"
            element={auth.isLoggedIn ? handleUserView() : <Home />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
