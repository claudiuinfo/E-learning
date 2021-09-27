import './Modal.css';
import React, { Component, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';

class EditQuizTeacher extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      editQuestion: {},
      answerList: [],
      originalQuestion: {},
      originalAnswerList: []
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);

    console.log(props)
    Axios.get("http://localhost:8081/question/" + this.props.questionId).then( (response) => { 
        console.log(response);
        this.setState({editQuestion: response.data, originalQuestion: response.data});
    });

    Axios.get("http://localhost:8081/answer/all/" + this.props.questionId).then( (response) => { 
        console.log(response);
        this.setState({answerList: response.data, originalAnswerList: response.data});
    });
  }

  updateQuestionAndAnswers() {
    Axios.get("http://localhost:8081/question/" + this.props.questionId).then( (response) => { 
        console.log(response);
        this.setState({editQuestion: response.data, originalQuestion: response.data});
    });

    Axios.get("http://localhost:8081/answer/all/" + this.props.questionId).then( (response) => { 
        console.log(response);
        this.setState({answerList: response.data, originalAnswerList: response.data});
    });
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
    this.setState({editQuestion: this.state.originalQuestion, answerList: this.state.originalAnswerList});
    console.log(this.state.editQuestion);
    console.log(this.state.answerList);
  }

  handleSave() {
    this.setState({
        show: false
      })
      console.log(this.state.editQuestion);
    console.log(this.state.answerList);
      let newForm = {
        question: this.state.editQuestion,
        answers: this.state.answerList
      }    
      console.log(newForm);
  
      Axios.put("http://localhost:8081/question/" + this.props.questionId, newForm).then( (response) => {
          console.log("succes");
          console.log(response.data);
          this.updateQuestionAndAnswers();
          this.props.refreshPage();
        });
  }

  deleteAnswer(e) {
    var allAnswers = this.state.answerList;
    var all= allAnswers.map(element => {
      if(element.id == e.id) {
        return null;
      } else {
        return element;
      }
    }).filter(e => e != null)
    this.setState({
      answerList: all
    })
  }

  handleQuestionChange = event => {
    let questionCopy = this.state.editQuestion;
    questionCopy.question = event.target.value;
    this.setState({
      editQuestion: questionCopy
    })
  }

  handleAnswerChange = event => {
    console.log(event.target.id);
    var allAnswers = this.state.answerList;
    var all= allAnswers.map(element => {
      if(element.id == event.target.id) {
        return {id:element.id, answer:event.target.value, isCorrect:element.isCorrect}
      } else {
        return element;
      }
    })
    this.setState({
      answer: event.target.value,
      answerList: all
    })
  }

  handleCorrectChange = event => {
    console.log(event.target.id);
    var allAnswers = this.state.answerList;
    var all= allAnswers.map(element => {
      if(("c" + element.id) == event.target.id) {
        return {id:element.id, answer:element.answer, isCorrect:event.target.checked ? 1 : 0}
      } else {
        return element;
      }
    })
    this.setState({
      isCorrect: event.target.value,
      answerList: all
    })
  }

  render() {
    return (
      <>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="primary" style={{}} onClick={this.handleShow}>
            Edit
          </Button>
        </div>
        
        <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
          <Modal.Header>
            <Modal.Title>Edit question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="element">
              <label>Question</label>
              <input
                type="text" value={this.state.editQuestion.question} onChange={this.handleQuestionChange}
              />
            </div>
            {this.state.answerList.map((e, index) => {
                return  (
                <div class="form-group row">
                    <div class="element">
                    <label>Answer {index+1}</label>
                    <input id={e.id}
                        type="text" value={e.answer} onChange={this.handleAnswerChange}
                    />
                    </div>

                    <div class="element">
                    {e.isCorrect ? <input class="form-check-input" type="checkbox"
                        id={"c" + e.id}
                        name="text"
                        onChange={this.handleCorrectChange}
                        checked
                        />
                        :
                        <input class="form-check-input" type="checkbox"
                        id={"c" + e.id}
                        name="text"
                        onChange={this.handleCorrectChange}/>
                    }
                    </div>

                    <Button variant="outline-danger" onClick={() => this.deleteAnswer(e)}>Delete</Button>
                </div>
                )
              })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );    //return

  }   //render
}

export default EditQuizTeacher;