import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';

function Student(props) {
    const [quizList, setQuizList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [teacherId, setTeacherId] = useState(0);
    let params = useParams();
    console.log(params);
 
    useEffect(() => { 
      let urlForAllQuizzes = "http://localhost:8081/quiz/all/active";
      console.log(teacherId);
      if (teacherId != 0) {
        urlForAllQuizzes += "/" + teacherId;
      }
      Axios.get(urlForAllQuizzes).then( (response) => { 
        console.log(response);
        setQuizList(response.data);
      });
    }, [teacherId]);

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

    const getStatus = (element) => {
      switch(element.status) {
        case 'active':
          return 'active until ' + element.dueDate;
          break;
        case 'expired':
          return 'expired on ' + element.dueDate
          break;
        default:
          return 'no status' 
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
        <div className="list-group">
          {quizList.map( (element, index) => {
            return (
              <a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id} className="list-group-item list-group-item-action">
                Quiz {element.id} {getStatus(element)}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default Student;