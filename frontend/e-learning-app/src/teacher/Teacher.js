import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';
import Form from './Form';
import AddQuizModal from './AddQuizModal';

function Teacher() {
  const [quizList, setQuizList] = useState([]);
  const [quizStatus, setQuizStatus] = useState("all");
  const [quizAdded, setQuizAdded] = useState(0);
  const [quizVisibility, setQuizVisibility] = useState(-1);
  let params = useParams();
  console.log(params);

  useEffect(() => { 
    Axios.get("http://localhost:8081/quiz/all/" + params.teacherId).then( (response) => { 
      console.log(response);
      let newQuizList = [];
      if (quizStatus == "all") {
        newQuizList = response.data;
      } else {
          newQuizList = response.data.filter((element, index) => {
            return quizStatus == element.status;  
          });
      }

      if (quizVisibility == -1) {
        setQuizList(newQuizList);
      } else {
        setQuizList(newQuizList.filter((element, index) => {
          return quizVisibility == element.isActive;  
        }));
      } 
    });
  }, [quizStatus, quizVisibility, quizAdded]);

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
            Quiz {element.id} {element.isActive ? 'is visible' : 'is not visible'} active until {element.dueDate};
          </a>
          break;
        case 'expired':
          return <a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id} className="list-group-item list-group-item-action list-group-item-warning">
            Quiz {element.id} {element.isActive ? 'is visible' : 'is not visible'} finished on {element.dueDate}
          </a>
          break;
        default:
          return <a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id} className="list-group-item list-group-item-action list-group-item-danger">
            Quiz {element.id} {element.isActive ? 'is visible' : 'is not visible'} without status
          </a> 
      }
    }

    const handleSelectedStatusChange = (e) => {
      console.log(e.target.value);
      setQuizStatus(e.target.value);
    }

    const handleSelectedVisibilityChange = (e) => {
      console.log(e.target.value);
      setQuizVisibility(e.target.value);
    }

    return (
      <div>
        Teacher
        <select onChange={e => handleSelectedStatusChange(e)} className="form-select" aria-label="Filter for quizzes">
          <option value="all">All status</option>
          <option value="active">ACTIVE</option>
          <option value="expired">FINISHED</option>
        </select>
        <select onChange={e => handleSelectedVisibilityChange(e)} className="form-select" aria-label="Filter for quizzes">
          <option value={-1}>All visibility</option>
          <option value={1}>VISIBLE</option>
          <option value={0}>NOT VISIBLE</option>
        </select>
        <div className="list-group">
          {quizList.map( (element, index) => {
            return (
              getStatus(element)
            );
          })}
        </div>
        <AddQuizModal setQuizAdded={() => setQuizAdded(quizAdded+1)} />
      </div>
    );
}
  
  export default Teacher;