import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Teacher() {

    const addQuiz = () => {
      let newQuiz = {
        id: Math.floor(Math.random() * 1000),
        teacherId: 1,
        noQuestions: Math.floor(Math.random() * 30),
        isActive: 1
      }
      console.log(  newQuiz);
      
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
      </div>
    );
  }
  
  export default Teacher;