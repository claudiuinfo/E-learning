import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';
import Timer from './Timer';

function StudentQuiz({match}) {
  const [quizIsStarted, setQuizIsStarted] = useState(false);
  const [quiz, setQuiz] = useState({});
  let params = useParams();
  console.log(params);
  const [questions, setQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => { 
    Axios.get("http://localhost:8081/quiz/" + params.quizId).then( (response) => { 
      console.log(response);
      setQuiz(response.data);
    });

    Axios.get("http://localhost:8081/question/all/" + params.quizId).then( (response) => { 
        console.log(response);
        setQuestions(response.data);
        let x = response.data.map(element => {
          return {question: element.question, answers: element.answers.map(e => {
            return {...e, isChecked: false}
          })};
        })
        
        setAllAnswers(x);
        console.log(x)
    });
  }, []);

  const startQuiz = () => {
    setQuizIsStarted(true);
  }

  const submitQuiz = () => {
    let x = allAnswers.map(element => {
      return {question: element.question, answers: element.answers.filter(e => {
        console.log(e.isChecked)
        return e.isChecked;
      })};
    });
    setAllAnswers(x);
    console.log(x);

    Axios.post("http://localhost:8081/quiz/submit/" + params.quizId + "?studentId=" + params.studentId, x).then( (response) => {
        console.log("succes");
        console.log(response.data);
      });
  }

  const handleCheckboxChange = event => {
    console.log(event.target.id);
    let x = allAnswers.map(element => {
      return {question: element.question, answers: element.answers.map(e => {
        if (e.id == event.target.id) {
          let copyE = e;
          copyE.isChecked = event.target.checked;
          return copyE;
        } else return e;
      })};
    });
    setAllAnswers(x);
    console.log(allAnswers);
  }

  const renderQuestion = (element) => {
    //console.log(element)
    return <div>
        <h2>{element.question.question}</h2>
        {
          element.answers.map( (e, i) => {
            return <div className="form-check">
              <input className="form-check-input" type="checkbox" value={e.answer} onChange={handleCheckboxChange} id={e.id}/>
              <label className="form-check-label" for="flexCheckDefault">
                {e.answer}
              </label>
            </div>
          })
        }
      </div>
  }

    return (
      <div>
        StudentQuiz
        Quiz with id {quiz.id} by teacher with id {quiz.teacherId}
        {quizIsStarted ?
          (
            <div>
              <Timer hours={0} minutes={1} />
              {questions.map( (element, index) => {
                return (
                  renderQuestion(element)
                );
              })}
              <button type="button" className="btn btn-primary" onClick={submitQuiz}>Submit quiz!</button>
            </div>
          ) : 
          (
            <button type="button" className="btn btn-primary" onClick={startQuiz}>Start quiz!</button>
          )
        }
      </div>
    );
}
  
  export default StudentQuiz;