import { Container, Navbar, Offcanvas, Nav, Button, Row, Col, Table, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { selectAllTasks } from '../TaskSlicer';
import img from '../../img/logo.png';
import { useSelector } from 'react-redux';
import { List } from 'lucide-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SubTask from './DisplaySubTask.js';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function DisplayTask({ task }) {
    const renderTooltip = (progress, props) => (

        <Tooltip id="button-tooltip" {...props}>
            Progress {progress} %
        </Tooltip>
    );

    return (
        <>
            <Card>
                <Card.Header
                    style={{ border: 'none' }} className='d-flex text-center justify-content-center align-items-center' >
                    <h1>{task.name}</h1>
                </Card.Header>
                <Card.Body>
                    <Table>
                        <tbody className='no-border-style'>
                            <tr >
                                <td>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="description" >
                                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                                <Form.Control as="textarea" style={{ height: '100px' }} defaultValue={task.description} />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Form>
                                </td>
                                <td>
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip(66)}
                                    >
                                        <div style={{ width: 60, height: 60, float: 'right' }} >
                                            <CircularProgressbar value={66} counterClockwise={true} />
                                        </div>
                                    </OverlayTrigger>
                                    {/* <CircularProgressbar value={66} counterClockwise={true} /> */}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <>
                        {task.subtasks && task.subtasks.length > 0 ? (
                            task.subtasks.map(subtask => {
                                return <SubTask
                                    key={subtask.id}
                                    taskId={task.id}
                                    subtaskId={subtask.id}
                                />
                            })) : <div>No subtasks</div>
                        };
                    </>
                </Card.Body>
                <Card.Footer style={{ border: 'none', background: "inherit" }} className='d-flex' >{task.createdBy} / {task.createdDate}</Card.Footer>
            </Card >
        </>
    );
}