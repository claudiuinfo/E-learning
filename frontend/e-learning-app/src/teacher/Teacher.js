import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';

function Teacher() {
  const [quizList, setQuizList] = useState([]);
  let params = useParams();
  console.log(params);

  useEffect(() => { 
    Axios.get("http://localhost:8081/quiz/all/" + params.teacherId).then( (response) => { 
      console.log(response);
      setQuizList(response.data);
    });
  }, []);

    const addQuiz = () => {
      let newQuiz = {
        id: Math.floor(Math.random() * 1000),
        teacherId: 1,
        noQuestions: Math.floor(Math.random() * 30),
        isActive: 1
      }
      console.log(newQuiz);
      
      Axios.post("http://localhost:8081/quiz", {
          quiz: newQuiz
      }).then( (response) => {
        console.log("succes");
        console.log(response.data);
      });
    }

    return (
      <div>
        Teacher
        <button type="button" className="btn btn-primary" onClick={addQuiz}>Add quiz</button>
        <div className="list-group">
          {quizList.map( (element, index) => {
            return (
              <a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id} className="list-group-item list-group-item-action">Quiz {element.id}</a>
            );
          })}
        </div>
      </div>
    );
}
  
  export default Teacher;