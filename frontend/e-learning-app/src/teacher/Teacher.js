import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Teacher() {

    const addQuiz = () => {
      let newQuiz = {
        id: Math.floor(Math.random() * 1000),
        teacher_id: 1,
        no_questions: Math.floor(Math.random() * 30),
        is_active: false
      }
      console.log(  newQuiz);
      
      Axios.post("http://localhost:8081/api/quiz", {
        quiz: newQuiz
      }).then( (response) => {
        console.log("succes");
        console.log("newQuiz after response: " + response);
      });
    }

    return (
      <div>
        Teacher
        <button type="button" className="btn btn-primary" onClick={addQuiz}>Add quiz</button>
      </div>
    );
  }
  
  export default Teacher;