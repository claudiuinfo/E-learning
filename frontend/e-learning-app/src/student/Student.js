import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Student() {
    const [quizList, setQuizList] = useState([]);

    useEffect(() => { 
      Axios.get("http://localhost:8081/quiz/all").then( (response) => { 
        setQuizList(response.data.quizList);
      });
    });

    return (
      <div>
        Student
        <ul>
          {quizList.map( (element, index) => {
            return (
              <li><a href="http://localhost:3000/student">Quiz {element.id}</a></li>
            );
          })}
        </ul>
      </div>
    );
  }
  
  export default Student;