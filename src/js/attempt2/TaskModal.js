import { Container, Navbar, Offcanvas, Nav, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { selectAllTasks, selectTask, getSelectedTask, addTask } from '../TaskSlicer';
import img from '../../img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'lucide-react';
import Task from "./Task.js";
import DisplayTask from "./DisplayTask.js";

export default function TaskModal({ showModal, handleCloseModal }) {
    // console.log("Task Modal " + showModal);
    const dispatch = useDispatch();
    let taskName = '';
    let taskDescription = '';
    let taskCreatedBy = '';
    let taskCreatedAt = new Date().toISOString().split('T')[0];

    return (
        < Modal show={showModal} onHide={handleCloseModal} >
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addTaskForm">
                    <Form.Group className="mb-3" controlId="taskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task Name" onChange={e => taskName = e.target.value} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Task Description" onChange={e => taskDescription = e.target.value} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskCreatedBy">
                        <Form.Label>Created By</Form.Label>
                        <Form.Control type="text" placeholder="Enter Created By" onChange={e => taskCreatedBy = e.target.value} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskCreatedAt">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter Start Date"
                            onChange={e => {
                                const newValue = e.target.value;
                                if (newValue !== taskCreatedAt) {
                                    taskCreatedAt = newValue;
                                }
                            }}
                            defaultValue={new Date().toISOString().split('T')[0]}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {

                    console.log('Saving task...' + taskCreatedAt);;
                    const newTask = {
                        name: taskName,
                        description: taskDescription,
                        createdBy: taskCreatedBy,
                        createdAt: taskCreatedAt
                    };
                    console.log('Saving task...', newTask);
                    dispatch(addTask(newTask));
                    // You can dispatch an action or call a function here to save the task
                    handleCloseModal();
                }}>
                    Save Task
                </Button>
            </Modal.Footer>
        </Modal >
    );
}