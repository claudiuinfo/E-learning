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

function App() {
  return (
    <div className="App">
     <Router>
        <Switch>
          <Route exact path="/student">
            <Student />
          </Route>
          <Route exact path="/teacher">
            <Teacher />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
