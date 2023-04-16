import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { logout } from "../reducers/userReducer";

const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
          </Nav>
          <Nav style={{ alignItems: "center", gap: 8 }}>
            <Navbar.Text>{user.name} logged in</Navbar.Text>
            <Button size="sm" variant="danger" onClick={handleLogout}>
              logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
