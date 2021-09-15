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

function App() {
  return (
    <div className="App">
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/student">
            <AllStudents />
          </Route>
          <Route exact path="/student/:id">
            <Student />
          </Route>
          <Route exact path="/teacher">
            <AllTeachers />
          </Route>
          <Route exact path="/teacher/:id">
            <Teacher />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
