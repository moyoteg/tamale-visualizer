
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import strings from "../../Helpers/Strings";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © {strings.yearLastUpdated}{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href={strings.pragCoreURL}
                    target="_blank"
                  >
                    {strings.pragCore}
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href={strings.pragCoreURL}
                      target="_blank"
                    >
                      {strings.pragCore}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href={strings.pragCoreURL}
                      target="_blank"
                    >
                      {strings.aboutUs}
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
