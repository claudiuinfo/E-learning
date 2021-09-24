import './Modal.css';
import React, { Component, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';
import { withRouter } from "react-router";

class AddQuizModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teacherId: '',
      numberOfQuestions: '',
      isActive: '',       
      dueDate: '',

      //TIMER
      timerH: '',
      timerM: '',
      show: false,
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }


  handleShow() {
    this.setState({
      show: true
    })
  }

  handleClose() {
    this.setState({
      show: false
    })
  }

  handlenumberOfQuestionsChange = event => {
    this.setState({
      numberOfQuestions: event.target.value
    })
  }

  handleStateChange = event => {
    this.setState({
      isActive: event.target.value
    })
  }

  handleDueDateChange = event => {
    this.setState({
      dueDate: event.target.value
    })
  }

  handleTimerHChange = event => {
    this.setState({
      timerH: event.target.value
    })
  }

  handleTimerMChange = event => {
    this.setState({
      timerM: event.target.value
    })
  }

  handleSubmit = event => {
    alert(`${this.state.numberOfQuestions} ${this.state.questions} ${this.state.answers}
			   ${this.state.teacherId} ${this.state.isActive}`)
    event.preventDefault()
  }

  addQuiz = () => {
    let newQuiz = {
      teacherId: this.props.match.params.teacherId,
      noQuestions: 0,
      isActive: 0,
      dueDate: this.state.dueDate,
      timerH: this.state.timerH,
      timerM: this.state.timerM
    }
    console.log(newQuiz);

    Axios.post("http://localhost:8081/quiz", {
      quiz: newQuiz
    }).then((response) => {
      console.log("succes");
      //alert("Quiz was posted!");
      console.log(response.data);
      this.props.setQuizAdded();
    });
    this.handleClose();
  }


  render() {
    const { numberOfQuestions, isActive, dueDate, timerH, timerM } = this.state
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}>

          <Button variant="primary" style={{}} onClick={this.handleShow}>
            Add new Quiz
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
          <Modal.Header>
            <Modal.Title>Add new quiz</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="element">
              <label>Due Date</label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={this.handleDueDateChange}
              />
            </div>
            <div class="element">
              <label>Timer </label>
              <input
                type="text" id="timer"
                value={timerH}
                onChange={this.handleTimerHChange}
              />h
              <input
                type="text" id="timer"
                value={timerM}
                onChange={this.handleTimerMChange}
              />min
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addQuiz}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );    //return

  }   //render
}

export default withRouter(AddQuizModal);