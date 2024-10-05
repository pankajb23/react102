import { Container, Navbar, Offcanvas, Nav, Button, Row, Col, Table, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { selectAllTasks, removeTask } from '../TaskSlicer';
import img from '../../img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'lucide-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SubTask from './DisplaySubTask.js';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import SubTaskModal from './SubTaskModal.js';

export default function DisplayTask({ taskId }) {
    const renderTooltip = (progress, props) => (

        <Tooltip id="button-tooltip" {...props}>
            Progress {progress} %
        </Tooltip>
    );

    const allTasks = useSelector(selectAllTasks);
    const task = allTasks.find(task => task.id === taskId);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const totalSubTasks = task.subtasks ? task.subtasks.length : 0;
    const completedSubTasks = task.subtasks ? task.subtasks.filter(subtask => subtask.status === 'Done').length : 0;
    const progress = totalSubTasks > 0 ? Math.round((completedSubTasks / totalSubTasks) * 100) : 0;

    return (
        <>
            <Card>
                <Card.Header style={{ display: "flex", justifyContent: 'space-between' }}>
                    <h2>{task.name}</h2>
                    <Button variant="danger" size="sm" onClick={() => dispatch(removeTask({ taskId: taskId }))}>Delete</Button>
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
                                        overlay={renderTooltip(progress)}
                                    >
                                        <div style={{ width: 60, height: 60, float: 'right' }} >
                                            <CircularProgressbar value={progress} counterClockwise={true} />
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
                        }
                    </>
                    <div className="p-3 d-flex justify-content-between align-items-center" style={{width:'20%'}}>
                        <Button variant="primary" onClick={() => setShowModal(true)} className="w-100">
                            Add Sub Task
                        </Button>
                    </div>
                    <SubTaskModal taskId={taskId} showModal={showModal} handleCloseModal={handleCloseModal} />
                </Card.Body>
                <Card.Footer style={{ border: 'none', background: "inherit" }} className='d-flex' >{task.createdBy} / {task.createdDate}</Card.Footer>
            </Card >
        </>
    );
}