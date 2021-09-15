import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';

function TeacherQuiz({match}) {
  const [quiz, setQuiz] = useState({});
  let params = useParams();
  console.log(params);

  useEffect(() => { 
    Axios.get("http://localhost:8081/quiz/" + params.quizId).then( (response) => { 
      console.log(response);
      setQuiz(response.data);
    });
  }, []);

    return (
      <div>
        TeacherQuiz
        Quiz with id {quiz.id} by teacher with id {quiz.teacherId}
      </div>
    );
}
  
  export default TeacherQuiz;