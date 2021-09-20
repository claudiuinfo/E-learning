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

  useEffect(() => { 
    Axios.get("http://localhost:8081/quiz/" + params.quizId).then( (response) => { 
      console.log(response);
      setQuiz(response.data);
    });

    Axios.get("http://localhost:8081/question/all/" + params.quizId).then( (response) => { 
        console.log(response);
        setQuestions(response.data);
    });
  }, []);

  const startQuiz = () => {
    setQuizIsStarted(true);
  }

  const renderQuestion = (element) => {
    console.log(element)
    return <div>
        <h2>{element.question.question}</h2>
        {
          element.answers.map( (e, i) => {
            return <div className="form-check">
              <input className="form-check-input" type="checkbox" value={e.answer} id="flexCheckDefault"/>
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