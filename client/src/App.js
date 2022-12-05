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
import UserDashboard from "./components/UserDashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import ViewTutoringTimeSlot from "./components/ViewTutoringTimeSlot";

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

  function handle_dashboard_key_change(key) {
    setDashboardKey(key);
  }


  function handle_user_view() {
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
                  handle_dashboard_key_change={handle_dashboard_key_change}
                />
              }
            />
            <Route
              //TODO:Make more Restful /tutoring to show all slots use school in controler
              path={"/user/tutoring"}
              element={
                <UserDashboard
                  dashboardKey={"tutoring"}
                  handle_dashboard_key_change={handle_dashboard_key_change}
                />
              }
            />
            <Route
              path={"/user/session_signup"}
              element={
                <UserDashboard
                  dashboardKey={"sessionSignup"}
                  handle_dashboard_key_change={handle_dashboard_key_change}
                />
              }
            />
            <Route
              path={"/user/:id"}
              element={
                <UserDashboard
                  dashboardKey={dashboardKey}
                  handle_dashboard_key_change={handle_dashboard_key_change}
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
            element={auth.isLoggedIn ? handle_user_view() : <Home />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
