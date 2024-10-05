import { Container, Navbar, Offcanvas, Nav, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { selectAllTasks, selectTask, getSelectedTask, addSubTask } from '../TaskSlicer';
import img from '../../img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'lucide-react';
import Task from "./Task.js";
import DisplayTask from "./DisplayTask.js";

export default function SubTaskModal({ taskId, showModal, handleCloseModal }) {
    let taskName = '';
    let taskDescription = '';
    let taskCreatedAt = new Date().toISOString().split('T')[0];
    let taskDueDate = new Date().toISOString().split('T')[0];

    const dispatch = useDispatch();
    return (
        < Modal show={showModal} onHide={handleCloseModal} >
            <Modal.Header closeButton>
                <Modal.Title>Add New Sub Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="taskName">
                        <Form.Label>Sub Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task Name" onChange={e => { taskName = e.target.value }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label>Sub Task Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Task Description" onChange={e => {
                            taskDescription = e.target.value;
                        }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDueDate">
                        <Form.Label>Start Date</Form.Label>
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
                    <Form.Group className="mb-3" controlId="taskDueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter due Date"
                            onChange={e => {
                                const newValue = e.target.value;
                                if (newValue !== taskDueDate) {
                                    taskDueDate = newValue;
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

                    const newSubTask = {
                        taskId: taskId,
                        subTaskName: taskName,
                        description: taskDescription,
                        startDate: taskCreatedAt,
                        dueDate: taskDueDate
                    };
                    console.log('Saving sub-task...', newSubTask);
                    dispatch(addSubTask(newSubTask));
                    // You can dispatch an action or call a function here to save the task
                    handleCloseModal();
                }}>
                    Save Task
                </Button>
            </Modal.Footer>
        </Modal >
    );
}