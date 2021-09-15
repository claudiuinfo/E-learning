import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function AllTeachers() {
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => { 
      Axios.get("http://localhost:8081/teacher/all").then( (response) => { 
        console.log(response);
        setTeacherList(response.data);
      });
    });

    return (
      <div>
        All Teachers
        <ul>
          {teacherList.map( (element, index) => {
            return (
              <li><a href={"http://localhost:3000/teacher/" + element.id}>Teacher {element.name} with id {element.id}</a></li>
            );
          })}
        </ul>
      </div>
    );
  }
  
  export default AllTeachers;