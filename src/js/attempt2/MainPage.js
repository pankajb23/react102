import { Container, Navbar, Offcanvas, Nav, Button, Row, Col, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { selectAllTasks, selectTask, getSelectedTask } from '../TaskSlicer';
import img from '../../img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'lucide-react';
import Task from "./Task.js";
import DisplayTask from "./DisplayTask.js";
import TaskModal from "./TaskModal.js";

const MainPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const allTasks = useSelector(selectAllTasks);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);
  const selectedTask = useSelector(getSelectedTask);

  const dispatch = useDispatch();
  // console.log("Main Page " + JSON.stringify(selectedTask));
  // console.log("Main Page with all Tasks " + JSON.stringify(allTasks));

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container fluid>
          <Button variant="outline-light" onClick={handleShowSidebar} className="me-2">
            <List size={24} />
          </Button>
          <Navbar.Brand href="#home">
            <img
              alt="Task Manager"
              src={img}
              width="80"
              height="40"
              className="d-inline-block align-top"
            />{''}
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Offcanvas Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={handleCloseSidebar}
        backdrop={false}
        placement="start"
        style={{ top: '66px', background: 'white' }} // Adjusting for navbar height
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tasks</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ margin: '0px', padding: '0px' }}>
          <Nav className="flex-column" >
            {allTasks && allTasks.length > 0 ? (
              allTasks.map(task => {
                return <Task
                  key={task.id}
                  task={task}
                  onClick={() => {
                    dispatch(selectTask({ task }));
                  }} />
              }
              )) : (
              <span className="text-muted">No tasks available</span>
            )}
          </Nav>
        </Offcanvas.Body>
        <div className="p-3">
          <Button variant="primary" onClick={() => setShowModal(true)} className="w-100">
            Add Task
          </Button>
        </div>
      </Offcanvas>

      <TaskModal showModal={showModal} handleCloseModal={handleCloseModal} />

      {/* Main Content */}
      <Container fluid className="flex-grow-1 mt-5 pt-5">
        <Row className="h-100">
          <Col className="main-content">
            <DisplayTask taskId={selectedTask.id} />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="mt-auto py-3 bg-light">
        <Container>
          <span className="text-muted">© 2024 Task Manager. All rights reserved.</span>
        </Container>
      </footer>
    </div>
  );
};

export default MainPage;
