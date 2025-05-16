import { Container, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggle, Row } from "react-bootstrap";

export default function Agent(props) {
  // alert(props.isLoggedIn);
  return (
    <>
        <Navbar className="bg-dark">
          <Container>
            <NavbarBrand className="text-white-50">Agent Portal</NavbarBrand>
            {/* <NavbarToggle id="agent-portal-navbar-toggle" />
            <Nav>
              <NavItem>
                <NavList></NavList>
              </NavItem>
            </Nav> */}
          </Container>
          <Container>
            <Row className="w-100 justify-content-end">
              <button className="btn btn-danger w-auto" onClick={() => {
                localStorage.clear();
              }}>Logout</button>
            </Row>
          </Container>
        </Navbar>
        {props.element}
        <script src="bootstrap/src/collapse.js"></script>
    </>
  );
}
