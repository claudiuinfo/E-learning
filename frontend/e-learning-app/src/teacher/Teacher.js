import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';
import Form from './Form';

function Teacher() {
  const [quizList, setQuizList] = useState([]);
  const [quizStatus, setQuizStatus] = useState("all");
  let params = useParams();
  console.log(params);

  useEffect(() => { 
    Axios.get("http://localhost:8081/quiz/all/" + params.teacherId).then( (response) => { 
      console.log(response);
      if (quizStatus == "all") {
        setQuizList(response.data);
      } else {
          setQuizList(response.data.filter((element, index) => {
            return quizStatus == element.status;  
          }));
      }
    });
  }, [quizStatus]);

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

    const getStatus = (element) => {
      switch(element.status) {
        case 'active':
          return <a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id} className="list-group-item list-group-item-action list-group-item-primary">
            Quiz {element.id} active until {element.dueDate};
          </a>
          break;
        case 'expired':
          return <a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id} className="list-group-item list-group-item-action list-group-item-warning">
            Quiz {element.id} finished on {element.dueDate}
          </a>
          break;
        default:
          return <a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id} className="list-group-item list-group-item-action list-group-item-danger">
            Quiz {element.id} without status
          </a> 
      }
    }

    const handleSelectedStatusChange = (e) => {
      console.log(e.target.value);
      setQuizStatus(e.target.value);
    }

    return (
      <div>
        Teacher
        <select onChange={e => handleSelectedStatusChange(e)} className="form-select" aria-label="Filter for quizzes">
          <option value="all">All status</option>
          <option value="active">ACTIVE</option>
          <option value="expired">FINISHED</option>
        </select>
        <div className="list-group">
          {quizList.map( (element, index) => {
            return (
              getStatus(element)
            );
          })}
        </div>
        <Form />
      </div>
    );
}
  
  export default Teacher;