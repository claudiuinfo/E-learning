import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function AllStudents() {
    const [studentList, setStudentList] = useState([]);

    useEffect(() => { 
      Axios.get("http://localhost:8081/student/all").then( (response) => { 
        console.log(response);
        setStudentList(response.data);
      });
    });

    return (
      <div>
        All Students
        <ul>
          {studentList.map( (element, index) => {
            return (
              <li><a href={"http://localhost:3000/student/" + element.id}>Student {element.name} with id {element.id}</a></li>
            );
          })}
        </ul>
      </div>
    );
  }
  
  export default AllStudents;