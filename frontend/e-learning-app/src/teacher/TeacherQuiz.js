import React, { useState, useEffect, Component } from 'react';
import Axios from 'axios';
import { useParams,  withRouter } from 'react-router';

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
      quizId: props.match.params.quizId
    }; 
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
          return {id:element.id, answer:element.answer, isCorrect:event.target.value}
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
          <div>
            <label>Answer </label>
            <input
              id={numberOfAnswers}
              name="text"
              onChange={this.handleAnswerChange}
            />
          </div>
          <div>
            <label>The answer is correct </label>
            <input
              id={"c" + numberOfAnswers}
              name="text"
              onChange={this.handleCorrectChange}
            />
          </div>
        </div>
      );

      allAnswers.push({id:numberOfAnswers, answer:"", isCorrect: 0});
  
      this.setState({
          attributeForm: array,
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

    // useEffect(() => {
    //   Axios.get("http://localhost:8081/quiz/" + params.quizId).then((response) => {
    //     console.log(response);
    //     setQuiz(response.data);
    //   });
    // }, []);

    render () {
      const { question, answer, isCorrect } = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
				<div>
					<label>Question </label>
					<input
						type="text"
						value={question}
						onChange={this.handleQuestionsChange}
					/>
				</div>
        <div>
              { 
                this.state.attributeForm.map(input => {
                    return input
                })
              }
              <button onClick={this.addAttributeForm.bind(this)}>ADD ANSWER</button>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.addQuestion}>Add question!</button>
      </form>
      )
    }
}
  
  export default  withRouter(TeacherQuiz);