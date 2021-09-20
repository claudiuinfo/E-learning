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
			isActive: '',
			dueDate: ''
		}
	}

	handlenumberOfQuestionsChange = event => {
		this.setState({
			numberOfQuestions: event.target.value
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

	handleDueDateChange = event => {
		this.setState({
			dueDate: event.target.value
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
		  dueDate: this.state.dueDate
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
		const { numberOfQuestions, questions, answers, teacherId, isActive, dueDate} = this.state
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
				<div>
					<label>Due Date</label>
					<input
						type="datetime-local"
						value={dueDate}
						onChange={this.handleDueDateChange}
					/>
				</div>
				<button type="button" className="btn btn-primary" onClick={this.addQuiz}>Add quiz!</button>
			</form>
		)
		
	}
}

export default Form;