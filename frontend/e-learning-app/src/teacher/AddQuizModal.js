import React, { Component, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { render } from 'react-dom';
import './Modal.css';

function AddQuizModal() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}>

        <Button variant="primary" onClick={handleShow}>
          Add new Quiz
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add new quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Number of questions </label>
            <input
              type="text"
            //value={numberOfQuestions}
            //onChange={this.handlenumberOfQuestionsChange}
            />
          </div>
          <div>
            <label>The quiz state</label>
            <input type="checkbox" name="service"
            //value={isActive} //onChange={this.handleStateChange} 
            />Visible
            <input type="checkbox" name="service" />Not visible
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="datetime-local"
              //value={dueDate}
              //onChange={this.handleDueDateChange}
            />
          </div>
          <div>
            <label>Timer </label>
            <input
              type="text"
            />h
            <input
              type="text"
            />min
          </div>

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

export default AddQuizModal;
