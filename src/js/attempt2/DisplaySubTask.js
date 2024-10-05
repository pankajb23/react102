import { Container, Navbar, Offcanvas, Nav, Button, Row, Col, Table, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { selectAllTasks, updateSubTaskAttribute, getSelectedSubTask } from '../TaskSlicer';
import img from '../../img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'lucide-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { removeSubTask } from '../TaskSlicer.js';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";





export default function SubTask({ taskId, subtaskId }) {


    const statusOptions = ['Done', 'In Progress', 'Not Started'];

    const subtask = useSelector(state => getSelectedSubTask(state, taskId, subtaskId));


    const dispatch = useDispatch();

    const cardBackgroundColor = () => {
        switch (subtask.status) {
            case 'Done':
                return '#f0f0f0';
            case 'In Progress':
                return '#f8f8f0';
            default:
                return '#ffffff';
        }
    };
    return (
        <>
            <div>
                <Card
                    style={{ width: '100%', margin: '0', padding: '0', "--bs-card-spacer-y": "0.75rem", "--bs-card-spacer-x": "0.75rem", backgroundColor: cardBackgroundColor() }}
                    className='task-card-transition '>
                    <Card.Header style={{ display: "flex", justifyContent: 'space-between' }}>
                        {subtask.name}
                        <Button variant="danger" size="sm" onClick={() => dispatch(removeSubTask({ taskId: taskId, subTaskId: subtaskId }))}>Delete</Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text >
                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                <Form.Control as="textarea" style={{ height: '100px' }}
                                    defaultValue={subtask.description}
                                    onChange={(e) => dispatch(updateSubTaskAttribute({
                                        taskId: taskId,
                                        "subTaskId": subtaskId,
                                        "attribute": "description",
                                        "value": e.target.value
                                    }))}
                                />
                            </FloatingLabel>
                        </Card.Text>
                        <Card.Text style={{ float: "right" }}>
                            <Form.Select onChange={(e) => dispatch(updateSubTaskAttribute({
                                taskId: taskId,
                                "subTaskId": subtaskId,
                                "attribute": "status",
                                "value": e.target.value
                            }))} defaultValue={subtask.status}>
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </Form.Select>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ border: 'none', justifyContent: 'space-between' }} className='d-flex justify-content-center align-items-center' >
                        <Table>
                            <thead>
                                <tr>
                                    <th>Start Date</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        <DatePicker selected={subtask.createdAt} onChange={(date) => dispatch(updateSubTaskAttribute({
                                            taskId: taskId,
                                            "subTaskId": subtaskId,
                                            "attribute": "createdAt",
                                            "value": date
                                        }))} /></td>
                                    <td>
                                        <DatePicker selected={subtask.dueDate} onChange={(date) => dispatch(updateSubTaskAttribute({
                                            taskId: taskId,
                                            "subTaskId": subtaskId,
                                            "attribute": "dueDate",
                                            "value": date
                                        }))} /></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Footer>
                </Card>
            </div>
        </>
    )
}