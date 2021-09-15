import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function AllStudents() {
    const [studentList, setStudentList] = useState([]);

    useEffect(() => { 
      Axios.get("http://localhost:8081/student/all").then( (response) => { 
        console.log(response);
        setStudentList(response.data);
      });
    }, []);

    return (
      <div>
        All Students
        <div className="list-group">
          {studentList.map( (element, index) => {
            return (
              <a href={"http://localhost:3000/student/" + element.id} className="list-group-item list-group-item-action">Student {element.name} with id {element.id}</a>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default AllStudents;