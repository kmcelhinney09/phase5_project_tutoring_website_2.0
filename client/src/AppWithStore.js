import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import {
  logOutUser,
  reAuthorizeUser,
} from "./components/ManageUsers/userSlice";

function AppWithStore() {
  const [dashboardKey, setDashboardKey] = useState("dashboard");
  const storeUser = useSelector((state) => state.user);
  const dispatch = useDispatch();


  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        dispatch(logOutUser());
      }
    });
  }

  function handleDashboardKeyChange(key) {
    setDashboardKey(key);
  }

  function handleUserView() {
    let navigation;
    if (storeUser.role === "admin") {
      navigation = <Navigate to={`/admin/${storeUser.id}`} />;
    } else {
      navigation = <Navigate to={`/user/${storeUser.id}`} />;
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
                {storeUser.isLoggedIn ? (
                  <Nav.Link href="/">
                    <Button variant="success" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Nav.Link>
                ) : null}
                <Nav.Link href="">
                  {storeUser.isLoggedIn ? storeUser.fullName : null}
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
            element={storeUser.isLoggedIn ? handleUserView() : <Home />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppWithStore;
