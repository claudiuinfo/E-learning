import React, { useState, useEffect, Component } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';

class TeacherQuiz extends Component{
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      isCorrect: '',
      attributeForm:[],
      allAnswers: [],
      numberOfAnswers: 0
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
      this.setState({
        isCorrect: event.target.value
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
              name="text"
              onChange={this.handleCorrectChange}
            />
          </div>
        </div>
      );

      allAnswers.push({id:numberOfAnswers, answer:""});
  
      this.setState({
          attributeForm: array,
          numberOfAnswers : numberOfAnswers + 1,
          allAnswers: allAnswers
      });
  }

  addQuiz = () => {
		let newForm = {
		  teacherId: this.state.teacherId,
      question: this.state.question,
      answers: this.state.allAnswers
    }    
		console.log(newForm);
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
          <button type="button" className="btn btn-primary" onClick={this.addQuiz}>Add question!</button>
      </form>
      )
    }
}
  
  export default TeacherQuiz;