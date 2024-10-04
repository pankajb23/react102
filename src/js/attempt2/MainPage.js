import React from "react";
import { useSelector } from 'react-redux';
import { selectAllTasks } from "../Selectors";
import {  Offcanvas } from "react-bootstrap";
import img from "../../img/logo.png";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MainPage() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MainPage;

// const MainPage = () => {
//     const allTasks = useSelector(selectAllTasks);
//     return (
//         <>
//             <Navbar bg="dark" data-bs-theme="dark" fixed="top">
//                 <Container>
//                     <Navbar.Brand href="#home">
//                         <img
//                             alt="Task Manager"
//                             src={img}
//                             width="80"
//                             height="40"
//                             className="d-inline-block align-top"
//                         />Task Manager
//                     </Navbar.Brand>
//                 </Container>
//             </Navbar>
//             <Offcanvas show={true} placement="end">
//                 <Offcanvas.Header closeButton>
//                     <Offcanvas.Title>Tasks</Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                 </Offcanvas.Body>
//             </Offcanvas>
//         </>
//     );
// };

// export default MainPage;