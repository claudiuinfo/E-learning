import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';

function Student(props) {
    const [quizList, setQuizList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [teacherId, setTeacherId] = useState(0);
    const [quizStatus, setQuizStatus] = useState("all");
    let params = useParams();
    console.log(params);
 
    useEffect(() => { 
      let urlForAllQuizzes = "http://localhost:8081/quiz/all/active";
      console.log(teacherId);
      if (teacherId != 0) {
        urlForAllQuizzes += "/" + teacherId;
      }
      urlForAllQuizzes += "?studentId=" + params.studentId;
      Axios.get(urlForAllQuizzes).then( (response) => { 
        console.log(response);
        if (quizStatus == "all") {
          setQuizList(response.data);
        } else {
            setQuizList(response.data.filter((element, index) => {
              return quizStatus == element.status;  
            }));
        }
      });
    }, [teacherId, quizStatus]);

    // Doar o singura data e apelata
    useEffect(() => {
      Axios.get("http://localhost:8081/teacher/all").then( (response) => { 
        console.log(response);
        setTeacherList(response.data);
      });
    }, []);

    const handleSelectedTeacherChange = (e) => {
      console.log(e.target.value);
      setTeacherId(e.target.value);
    }

    const handleSelectedStatusChange = (e) => {
      console.log(e.target.value);
      setQuizStatus(e.target.value);
    }

    const getTeacherName = (id) => {
      for (let teacher of teacherList) {
        if (id == teacher.id)
          return teacher.name;
      }
      return null;
    }

    const getStatus = (element) => {
      switch(element.status) {
        case 'active':
          return <a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id} className="list-group-item list-group-item-action list-group-item-primary">
            Quiz {element.id} created by teacher {getTeacherName(element.teacherId)} active until {element.dueDate};
          </a>
          break;
        case 'expired':
          return <a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id} className="list-group-item list-group-item-action disabled">
            Quiz {element.id} created by teacher {getTeacherName(element.teacherId)} expired on {element.dueDate}
          </a>
          break;
        case 'completed':
          return <a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id} className="list-group-item list-group-item-action list-group-item-success">
            Quiz {element.id} created by teacher {getTeacherName(element.teacherId)} completed with a score of {element.score} out of {element.noQuestions}
          </a>
          break;  
        default:
          return <a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id} className="list-group-item list-group-item-action list-group-item-danger">
            Quiz {element.id} created by teacher {getTeacherName(element.teacherId)} without status
          </a> 
      }
    }

    return (
      <div className="container">
        Student
        <select onChange={e => handleSelectedTeacherChange(e)} className="form-select" aria-label="Filter for quizzes">
          <option value={0}>All teachers</option>
          {teacherList.map( (element, index) => {
            return (
              <option value={element.id}>{element.name}</option>
            );
          })}
        </select>
        <select onChange={e => handleSelectedStatusChange(e)} className="form-select" aria-label="Filter for quizzes">
          <option value="all">All status</option>
          <option value="active">ACTIVE</option>
          <option value="expired">EXPIRED</option>
          <option value="completed">COMPLETED</option>
        </select>
        <div className="list-group">
          {quizList.map( (element, index) => {
            return (
              getStatus(element)
            );
          })}
        </div>
      </div>
    );
  }
  
  export default Student;