import { Container, Navbar, Offcanvas, Nav, Button, Row, Col, Table, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { selectAllTasks } from '../TaskSlicer';
import img from '../../img/logo.png';
import { useSelector } from 'react-redux';
import { List } from 'lucide-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Task({ task, onClick }) {
    const totalSubTasks = task.subtasks ? task.subtasks.length : 0;
    const completedSubTasks = task.subtasks ? task.subtasks.filter(subtask => subtask.status === 'Done').length : 0;
    const progress = totalSubTasks > 0 ? Math.round((completedSubTasks / totalSubTasks) * 100) : 0;
    
    return (
        <>
            <div onClick={onClick}>
                <Card style={{ width: '100%', margin: '0', padding: '0', "--bs-card-spacer-y": "0.75rem", "--bs-card-spacer-x": "0.75rem" }} className='task-card-transition'>
                    <Card.Body className="d-flex justify-content-between align-items-center ">
                        <Card.Title style={{ padding: '0px 0px 0px 3px' }}>{task.name}</Card.Title>
                        <div style={{ width: 30, height: 30 }} >
                            <CircularProgressbar value={progress} counterClockwise={true} />
                        </div>
                    </Card.Body>
                    <Card.Footer style={{ border: 'none', background: "inherit" }} className='d-flex' >{task.createdBy} / {task.createdDate}</Card.Footer>
                </Card>
            </div>
        </>
    );
}