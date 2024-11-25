import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

function Header() {
  const navigate = useNavigate();

  const logoutButton = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          NextChap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="dropdown-container">
            <Nav.Link href="/" className="width-text">
              Home
            </Nav.Link>
            <Nav.Link href="/user" className="width-text">
              My Books
            </Nav.Link>
            <Nav.Link href="/upload" className="width-text">
              Upload Books
            </Nav.Link>
            <NavDropdown
              className="width-text"
              title="Profile"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="/user/review">My Reviews</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" onClick={logoutButton}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
