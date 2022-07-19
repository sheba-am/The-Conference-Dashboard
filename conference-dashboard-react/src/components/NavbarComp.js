import React, {useState, useEffect} from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, Navigate } from "react-router-dom";
export default function NavbarComp() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [userState, setUserState] = useState()
    // let navigate = useNavigate(); 
    function handleClick(e) {
      e.preventDefault()
      localStorage.removeItem('user')
      setUserState(undefined)
      // navigate('/')
    }
    useEffect(() => {

    },[userState]);
        return(
            <div id='nav-bar'>
              <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="#home">Conference</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {user?<Nav.Link href="/dashboard">Dashboard</Nav.Link>:<Nav.Link href="/signup">Signup/login</Nav.Link>}
                  </Nav>
                </Navbar.Collapse>
                {user?<Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    Signed in as: <a href="#login">{user.username} ({user.status})</a>
                    <button class='btn logout-btn' style={{margin:'5px'}} onClick={handleClick}>Logout</button>
                  </Navbar.Text>
                </Navbar.Collapse>:<div></div>}
              </Container>
                        </Navbar>
            </div>
        )
               
}