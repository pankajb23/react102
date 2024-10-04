import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker'

function AddSubTaskModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Sub Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Sub-Task Name</Form.Label>
                            <Form.Control type="subTaskName" placeholder="Sub Task name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="subTaskDescription">
                            <Form.Label>Enter Sub-task descriptions. </Form.Label>
                            <Form.Control as="textarea" rows={4} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <DatePicker />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label as="select">Status</Form.Label>
                            <option>Not Started Yet</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSubTaskModal;