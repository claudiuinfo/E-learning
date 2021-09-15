import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function AllTeachers() {
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => { 
      Axios.get("http://localhost:8081/teacher/all").then( (response) => { 
        console.log(response);
        setTeacherList(response.data);
      });
    }, []);

    return (
      <div>
        All Teachers
        <div className="list-group">
          {teacherList.map( (element, index) => {
            return (
              <a href={"http://localhost:3000/teacher/" + element.id} className="list-group-item list-group-item-action">Teacher {element.name} with id {element.id}</a>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default AllTeachers;