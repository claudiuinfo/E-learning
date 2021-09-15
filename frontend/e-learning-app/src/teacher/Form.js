import React, { Component } from 'react'
import Axios from 'axios';

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			numberOfQuestions: '',
			questions: '',
			answers: '',
			teacherId: '',
			isActive: ''
		}
	}


	handlenumberOfQuestionsChange = event => {
		this.setState({
			numberOfQuestions: event.target.value
		})
	}

	handleQuestionsChange = event => {
		this.setState({
			questions: event.target.value
		})
	}

	handleAnswersChange = event => {
		this.setState({
			answers: event.target.value
		})
	}

	handleTeacherIdChange = event => {
		this.setState({
			teacherId: event.target.value
		})
	}

	handleStateChange = event => {
		this.setState({
			isActive: event.target.value
		})
	}

	handleSubmit = event => {
		alert(`${this.state.numberOfQuestions} ${this.state.questions} ${this.state.answers}
			   ${this.state.teacherId} ${this.state.isActive}`)
		event.preventDefault()
	}


	addQuiz = () => {
		let newQuiz = {
		  teacherId: this.state.teacherId,
		  noQuestions: this.state.numberOfQuestions,
		  isActive: this.state.isActive,
		  questions: [],
		  answers: []
		}
		console.log(newQuiz);
		
		Axios.post("http://localhost:8081/quiz", {
			quiz: newQuiz
		}).then( (response) => {
		  console.log("succes");
		  console.log(response.data);
		});
	  }

	render() {
		const { numberOfQuestions, questions, answers, teacherId, isActive} = this.state
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Number of questions </label>
					<input
						type="text"
						value={numberOfQuestions}
						onChange={this.handlenumberOfQuestionsChange}
					/>
				</div>
				<div>
					<label>Questions</label>
					<input
						type="text"
						value={questions}
						onChange={this.handleQuestionsChange}
					/>
				</div>
				<div>
					<label>Answers</label>
					<input
						type="text"
						value={answers}
						onChange={this.handleAnswersChange}
					/>
				</div>
				<div>
					<label>Teacher ID</label>
					<input
						type="text"
						value={teacherId}
						onChange={this.handleTeacherIdChange}
					/>
				</div>
				<div>
					<label>The quiz state</label>
					<input
						type="text"
						value={isActive}
						onChange={this.handleStateChange}
					/>
				</div>
				<button type="button" className="btn btn-primary" onClick={this.addQuiz}>Add quiz!</button>
			</form>
		)
		
	}
}

export default Form;