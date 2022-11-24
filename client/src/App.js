import "./App.css";
import { useEffect } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";

function App() {
  const auth = useAuth();

  useEffect(() => {
    auth.auto();
  }, []);

  function handleLogout() {
    auth.logout();
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
          <Route
            path={`/user/:id`}
            element={
              <ProtectedRoute isAllowed={auth.isLoggedIn}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              auth.isLoggedIn ? (
                <Navigate to={`/user/${auth.currentUser.id}`} />
              ) : (
                <Home />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
