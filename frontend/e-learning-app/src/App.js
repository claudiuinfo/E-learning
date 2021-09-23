import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Student from './student/Student';
import Teacher from './teacher/Teacher';
import Menu from './components/Menu';
import AllStudents from './student/AllStudents';
import AllTeachers from './teacher/AllTeachers';
import StudentQuiz from './student/StudentQuiz';
import TeacherQuiz from './teacher/TeacherQuiz';
import Upload from './teacher/Upload';
import UploadFiles from './components/upload-files.component';

function App() {
  return (
    <div className="App">
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/student">
            <AllStudents />
          </Route>
          <Route exact path="/student/:studentId">
            <Student />
          </Route>
          <Route exact path="/student/:studentId/quiz/:quizId">
            <StudentQuiz />
          </Route>
          <Route exact path="/teacher">
            <AllTeachers />
          </Route>
          <Route exact path="/teacher/:teacherId">
            <Teacher />
          </Route>
          <Route exact path="/teacher/:teacherId/quiz/:quizId">
            <TeacherQuiz />
          </Route>
          <Route exact path= "/upload">
            <UploadFiles />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
