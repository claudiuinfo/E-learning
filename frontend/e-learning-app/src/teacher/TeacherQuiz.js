import React, { useState, useEffect, Component } from 'react';
import Axios from 'axios';
import { useParams,  withRouter } from 'react-router';
import App from '../App';
import '../App.css'

class TeacherQuiz extends Component{
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      isCorrect: '',
      attributeForm:[],
      allAnswers: [],
      numberOfAnswers: 0,
      quizId: props.match.params.quizId,
      quiz: {},
      questions: []
    }; 

    Axios.get("http://localhost:8081/quiz/" + this.state.quizId).then( (response) => { 
      console.log(response);
      this.setState({quiz: response.data});
    });

    Axios.get("http://localhost:8081/question/all/" + this.state.quizId).then( (response) => { 
        console.log(response);
        this.setState({questions: response.data});
    });
  } 
   

    handleQuestionsChange = event => {
      this.setState({
        question: event.target.value
      })
    }

    handleAnswerChange = event => {
      console.log(event.target.id);
      var allAnswers = this.state.allAnswers;
      var all= allAnswers.map(element => {
        if(element.id == event.target.id) {
          return {id:element.id, answer:event.target.value}
        } else {
          return element;
        }
      })
      this.setState({
        answer: event.target.value,
        allAnswers: all
      })
    }

    handleCorrectChange = event => {
      console.log(event.target.id);
      var allAnswers = this.state.allAnswers;
      var all= allAnswers.map(element => {
        if(("c" + element.id) == event.target.id) {
          return {id:element.id, answer:element.answer, isCorrect:event.target.checked ? 1 : 0}
        } else {
          return element;
        }
      })
      this.setState({
        isCorrect: event.target.value,
        allAnswers: all
      })
    }

    handleSubmit = event => {
      alert(`${this.state.question}`)
      event.preventDefault()
    }

    addAttributeForm() {
      var array = this.state.attributeForm;
      var answer = this.state.answer;
      var isCorrect = this.state.isCorrect;
      var allAnswers = this.state.allAnswers;
      var numberOfAnswers = this.state.numberOfAnswers;
      array.push(
        <div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Answer</label>
          <div class="col-sm-5">
            <input  id={numberOfAnswers}
              name="text" class="form-control"
              onChange={this.handleAnswerChange} placeholder="Type here"/>
          </div>

        <div class="col-sm-2 col-form-label">
      <div class="form-check">
      <div class="col-sm-4">
        <input class="form-check-input" type="checkbox"
              id={"c" + numberOfAnswers}
              name="text"
              onChange={this.handleCorrectChange}/>
        <label class="form-check-label" for="exampleCheckbox">Check
        </label>
      </div>
      </div>
    </div>
        </div>
        </div>
      );

      allAnswers.push({id:numberOfAnswers, answer:"", isCorrect: 0});
  
      this.setState({
          attributeForm: array,
          correct: this.state.isCorrect,
          numberOfAnswers : numberOfAnswers + 1,
          allAnswers: allAnswers
      });
  }

  addQuestion = () => {
		let newForm = {
      question: {
        quizId: this.state.quizId,
        question: this.state.question
      },
      answers: this.state.allAnswers
    }    
		console.log(newForm);

    Axios.post("http://localhost:8081/question", newForm).then( (response) => {
        console.log("succes");
        console.log(response.data);
      });
  }
  
  renderQuestion = element => {
    console.log(element)
    return <div>
        <h2>{element.question.question}</h2>
        {
          element.answers.map( (e, i) => {
            return <p>{e.answer}</p>
          })
        }
      </div>
  }

    render () {
      const { question, answer, isCorrect } = this.state;
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
				<div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Question</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" value={question}
						onChange={this.handleQuestionsChange} id="inputPassword" placeholder="Input of question"/>
          </div>
				</div>
        </div>
        <div>
              { 
                this.state.attributeForm.map(input => {
                    return input
                })
              }
              <div class="mt-2 col-md-12 ">
              <div class="mb-3 form-check">
              
              {/* <button class="btn-sm" onClick={this.addAttributeForm.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-middle" viewBox="0 0 16 16">
                  <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8zm14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5z"/>
                </svg>  ADD ANSWER</button> */}

<button type="button" class="btn btn-warning btn-sm btn-lg"  onClick={this.addAttributeForm.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-middle" viewBox="0 0 16 16">
                  <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8zm14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5z"/>
                </svg> Add <span class="glyphicon glyphicon-ok"></span></button>
              </div>
          </div>
          </div>
          <div class="mb-8 ml-100">
          <button type="button" className="btn btn-warning btn-primary" onClick={this.addQuestion}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-middle" viewBox="0 0 16 16">
                  <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8zm14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5z"/>
                </svg> Add question!</button>
          </div>
      </form>

      {this.state.questions.map( (element, index) => {
        return (
          this.renderQuestion(element)
        );
      })}
      </div>
      
      )
    }
}
  
export default  withRouter(TeacherQuiz);